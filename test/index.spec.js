var test = require('tape')
var SpriteAnimator = require('../lib')

test('SpriteAnimator is properly exporting', function (t) {
  t.equal(typeof SpriteAnimator, 'function', 'SpriteAnimator is a function')
  t.equal(typeof SpriteAnimator.loadImage, 'function', 'SpriteAnimator static method loadImage is a function')
  t.end()
})

test('SpriteAnimator is a class and has current api', function (t) {
  var spriteAnimator = new SpriteAnimator({})
  t.equal(typeof spriteAnimator, 'object', 'instance of SpriteAnimator is an object')
  t.equal(typeof spriteAnimator.loadSprite, 'function', 'SpriteAnimator method loadSprite is a function')
  t.equal(typeof spriteAnimator.getSpritePosition, 'function', 'SpriteAnimator method getSpritePosition is a function')
  t.equal(typeof spriteAnimator.reset, 'function', 'SpriteAnimator method reset is a function')
  t.end()
})

// need to get PR up for static serving on tape-run for image to load in test
// to test other states of loadSprite

test('SpriteAnimator loadSprite will error when no valid sprite is passed', function (t) {
  var props = {
    onError: function (err) {
      t.equal(typeof err, 'object', 'onError is called with error object')
      t.end()
    },
    sprite: ''
  }
  var spriteAnimator = new SpriteAnimator(props)
  spriteAnimator.loadSprite()
})

test('SpriteAnimator getSpritePosition will get the correct position of the step for a horizontal direction', function (t) {
  var spriteAnimator = new SpriteAnimator({})
  var basicTest = spriteAnimator.getSpritePosition(0, {width: 10, height: 10, direction: 'horizontal'})
  var anotherStepTest = spriteAnimator.getSpritePosition(1, {width: 10, height: 10, direction: 'horizontal'})
  var extremeStepTest = spriteAnimator.getSpritePosition(1000, {width: 10, height: 10, direction: 'horizontal'})
  t.equal(basicTest, '0px 0px', 'getSpritePosition produces correct position on basic test')
  t.equal(anotherStepTest, '-10px 0px', 'getSpritePosition produces correct position on another step test')
  t.equal(extremeStepTest, '-10000px 0px', 'getSpritePosition produces correct position on a extreme step test')
  t.end()
})

test('SpriteAnimator getSpritePosition will get the correct position of the step for a vertical direction', function (t) {
  var spriteAnimator = new SpriteAnimator({})
  var basicTest = spriteAnimator.getSpritePosition(0, {width: 10, height: 10, direction: 'vertical'})
  var anotherStepTest = spriteAnimator.getSpritePosition(1, {width: 10, height: 10, direction: 'vertical'})
  var extremeStepTest = spriteAnimator.getSpritePosition(1000, {width: 10, height: 10, direction: 'vertical'})
  t.equal(basicTest, '0px 0px', 'getSpritePosition produces correct position on basic test')
  t.equal(anotherStepTest, '0px -10px', 'getSpritePosition produces correct position on another step test')
  t.equal(extremeStepTest, '0px -10000px', 'getSpritePosition produces correct position on a extreme step test')
  t.end()
})
