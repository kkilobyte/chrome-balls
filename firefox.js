'use strict';

function createMouseJoint(world, position, body) {
  var	b2MouseJointDef = box2d.b2MouseJointDef;

  var md = new b2MouseJointDef();
  md.bodyA = world.groundBody;
  md.bodyB = body;
  md.target.Copy(position);
  md.collideConnected = true;
  md.maxForce = 10000 * body.GetMass();
  var mouseJoint = world.boxWorld.CreateJoint(md);
  body.SetAwake(true);
  return mouseJoint;
}

function onPointerDown(interaction) {
  interaction.joint = createMouseJoint(
      interaction.world, interaction.position, interaction.thing.body);
}

function onPointerMove(interaction) {
  interaction.joint.SetTarget(interaction.position);
}

function onPointerUp(interaction) {
  interaction.world.boxWorld.DestroyJoint(interaction.joint);
  interaction.joint = null;
}

var walls = {};
var wallPositions;

function setWallPositions() {
  var	b2Vec2		      = box2d.b2Vec2;

  var p = world.viewSize.Clone();
  p.SelfAdd(new b2Vec2(1, 1));
  p.SelfMul(0.5);

  wallPositions = {
      'left': new b2Vec2(-p.x, 0),
      'right': new b2Vec2(p.x, 0),
      'floor': new b2Vec2(0, p.y),
      'ceiling': new b2Vec2(0, -p.y),
  };
}

function makeWalls(world, kind) {
  setWallPositions();
  walls['left'] = world.newThing(kind, {
      position: wallPositions['left'],
      scale: [1, 100]});
  walls['right'] = world.newThing(kind, {
      position: wallPositions['right'],
      scale: [1, 100]});
  walls['floor'] = world.newThing(kind, {
      position: wallPositions['floor'],
      scale: [100, 1]});
  walls['ceiling'] = world.newThing(kind, {
      position: wallPositions['ceiling'],
      scale: [100, 1]});
}

function moveWalls() {
  var	b2Vec2		      = box2d.b2Vec2;

  for (var w in walls) {
    var body = walls[w].body;
    var position = wallPositions[w];
    var difference = position.Clone();
    difference.SelfSub(body.GetPosition());
    if (difference.GetLength() > 0.1) {
      difference.Normalize();
      difference.SelfMul(10);
      body.SetLinearVelocity(difference);
    } else {
      body.SetLinearVelocity(new b2Vec2(0, 0));
      body.SetPosition(position);
    }
  }
}

function makeBalls(world, kind) {
  for (var i = -7; i <= 7; i++) {
    for (var j = -3; j <= 3; j++) {
      world.newThing(kind, {position: [0.7*i, 0.7*j], scale: [0.6, 0.6]});
    }
  }
}

function makeStirrer() {
  world.newThing('stirrer', {
      position: [-7 + 14 * Math.random(),
                 5 + 20 * Math.random()],
      angle: Math.PI / 4,
      velocity: [0, -10],
      scale: [0.3, 0.3],
  });
}

function resetStirrers() {
  var kind = world.allKinds['stirrer'];
  for (var t in kind.things) {
    var thing = kind.things[t];
    if (thing.body.GetPosition().y < -world.viewSize.y / 2) {
      thing.destroy();
      makeStirrer();
    }
  }
}

function onEnterFrameActions() {
  moveWalls();
  resetStirrers();
}

var resizeBIB = function () {};
function actuallyResize() {
  var b2Vec2          = box2d.b2Vec2;

  var defaultRatio = 16 / 9;
  var ratio = window.innerWidth / window.innerHeight;
  if (ratio > defaultRatio) {
    world.setViewSize([ratio * 9, 9]);
  } else {
    world.setViewSize([16, 16 / ratio]);
  }
  setWallPositions();
}

function resize() {
  resizeBIB();
}

var world;

function start() {
  var	b2Vec2		      = box2d.b2Vec2;

  // This needs to be added before creating the World, so that it can change
  // the viewSize before BIB resizes the canvas.
  window.addEventListener('resize', resize, true);

  world = new BIB.World('c');
  world.setGravity([0, 10]);
  world.setViewSize([16, 9]);
  world.onEnterFrameActions = onEnterFrameActions;

  var descriptors = {
    animations: [
      {
        name: 'chrome',
        file: 'chrome.png',
      }
    ],
    kinds: [
      {
        name: 'ball',
        animation: 'chrome',
        fixtures: [
          {
            shapeType: 'circle',
            shapeData: 0.45,
          },
        ],
      },
      {
        name: 'wall',
        movementType: 'kinematic',
        fixtures: [{}],
      },
      {
        name: 'stirrer',
        movementType: 'kinematic',
        fixtures: [{}],
      },
    ],
  }

  world.load(descriptors, onLoadComplete);
}

function onLoadComplete(world) {
  makeWalls(world, 'wall');
  makeBalls(world, 'ball');
  makeStirrer();
  makeStirrer();
  makeStirrer();

  world.allKinds['ball'].onPointerDown = onPointerDown;
  world.allKinds['ball'].onPointerMove = onPointerMove;
  world.allKinds['ball'].onPointerUp = onPointerUp;

  resizeBIB = actuallyResize;
  resize();

  world.start();
}

window.onload = start;

