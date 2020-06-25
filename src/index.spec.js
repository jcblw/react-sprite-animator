import React from 'react'
import TestRenderer from 'react-test-renderer'
import { SpriteAnimator } from '.'

describe('SpriteAnimator component', () => {
  it('should export properly', () => {
    expect(typeof SpriteAnimator).toBe('function')
  })

  it('should style a div width the given width and height', () => {
    const renderer = TestRenderer.create(
      <SpriteAnimator width={500} height={700} />
    )
    const div = renderer.root.findByType('div')

    expect(div.props.style.width).toBe('500px')
    expect(div.props.style.height).toBe('700px')
  })
})

// need to get PR up for static serving on tape-run for image to load in test
// to test other states of loadSprite
//
// test('SpriteAnimator loadSprite will error when no valid sprite is passed', function (t) {
//   var props = {
//     onError: function (err) {
//       t.equal(typeof err, 'object', 'onError is called with error object')
//       t.end()
//     },
//     sprite: '',
//   }
//   var spriteAnimator = new SpriteAnimator(props)
//   spriteAnimator.loadSprite()
// })
//
// test('SpriteAnimator getSpritePosition will get the correct position of the step for a horizontal direction', function (t) {
//   var spriteAnimator = new SpriteAnimator({})
//   var basicTest = spriteAnimator.getSpritePosition(0, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//   })
//   var anotherStepTest = spriteAnimator.getSpritePosition(1, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//   })
//   var extremeStepTest = spriteAnimator.getSpritePosition(1000, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//   })
//   t.equal(
//     basicTest,
//     '0px 0px',
//     'getSpritePosition produces correct position on basic test'
//   )
//   t.equal(
//     anotherStepTest,
//     '-10px 0px',
//     'getSpritePosition produces correct position on another step test'
//   )
//   t.equal(
//     extremeStepTest,
//     '-10000px 0px',
//     'getSpritePosition produces correct position on a extreme step test'
//   )
//   t.end()
// })
//
// test('SpriteAnimator getSpritePosition will get the correct position of the step for a vertical direction', function (t) {
//   var spriteAnimator = new SpriteAnimator({})
//   var basicTest = spriteAnimator.getSpritePosition(0, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//   })
//   var anotherStepTest = spriteAnimator.getSpritePosition(1, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//   })
//   var extremeStepTest = spriteAnimator.getSpritePosition(1000, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//   })
//   t.equal(
//     basicTest,
//     '0px 0px',
//     'getSpritePosition produces correct position on basic test'
//   )
//   t.equal(
//     anotherStepTest,
//     '0px -10px',
//     'getSpritePosition produces correct position on another step test'
//   )
//   t.equal(
//     extremeStepTest,
//     '0px -10000px',
//     'getSpritePosition produces correct position on a extreme step test'
//   )
//   t.end()
// })
//
// test('SpriteAnimator getSpritePosition will get the correct position of the step for a horizontal direction with wrapAfter', function (t) {
//   var spriteAnimator = new SpriteAnimator({})
//   var basicTest = spriteAnimator.getSpritePosition(0, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//     wrapAfter: 5,
//   })
//   var anotherStepTest = spriteAnimator.getSpritePosition(1, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//     wrapAfter: 5,
//   })
//   var wrapStepTest = spriteAnimator.getSpritePosition(8, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//     wrapAfter: 5,
//   })
//   var biggerWrapStepTest = spriteAnimator.getSpritePosition(12, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//     wrapAfter: 5,
//   })
//   var extremeStepTest = spriteAnimator.getSpritePosition(1000, {
//     width: 10,
//     height: 10,
//     direction: 'horizontal',
//     wrapAfter: 5,
//   })
//   t.equal(
//     basicTest,
//     '0px 0px',
//     'getSpritePosition produces correct position on basic test'
//   )
//   t.equal(
//     anotherStepTest,
//     '-10px 0px',
//     'getSpritePosition produces correct position on another step test'
//   )
//   t.equal(
//     wrapStepTest,
//     '-30px -10px',
//     'getSpritePosition produces correct position on another step test with row wrap'
//   )
//   t.equal(
//     biggerWrapStepTest,
//     '-20px -20px',
//     'getSpritePosition produces correct position on another step test with row wrap'
//   )
//   t.equal(
//     extremeStepTest,
//     '0px -2000px',
//     'getSpritePosition produces correct position on a extreme step test with row wrap'
//   )
//   t.end()
// })
//
// test('SpriteAnimator getSpritePosition will get the correct position of the step for a vertical direction with wrapAfter', function (t) {
//   var spriteAnimator = new SpriteAnimator({})
//   var basicTest = spriteAnimator.getSpritePosition(0, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//     wrapAfter: 5,
//   })
//   var anotherStepTest = spriteAnimator.getSpritePosition(1, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//     wrapAfter: 5,
//   })
//   var wrapStepTest = spriteAnimator.getSpritePosition(8, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//     wrapAfter: 5,
//   })
//   var biggerWrapStepTest = spriteAnimator.getSpritePosition(12, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//     wrapAfter: 5,
//   })
//   var extremeStepTest = spriteAnimator.getSpritePosition(1000, {
//     width: 10,
//     height: 10,
//     direction: 'vertical',
//     wrapAfter: 5,
//   })
//   t.equal(
//     basicTest,
//     '0px 0px',
//     'getSpritePosition produces correct position on basic test'
//   )
//   t.equal(
//     anotherStepTest,
//     '0px -10px',
//     'getSpritePosition produces correct position on another step test'
//   )
//   t.equal(
//     wrapStepTest,
//     '-10px -30px',
//     'getSpritePosition produces correct position on another step test with row wrap'
//   )
//   t.equal(
//     biggerWrapStepTest,
//     '-20px -20px',
//     'getSpritePosition produces correct position on another step test with row wrap'
//   )
//   t.equal(
//     extremeStepTest,
//     '-2000px 0px',
//     'getSpritePosition produces correct position on a extreme step test with row wrap'
//   )
//   t.end()
// })
//
// //testing for PR with new frame prop
//
// test('SpriteAnimator change currentFrame state when "frame" prop is present and it has value', function (t) {
//   var spriteAnimator = new SpriteAnimator({ frame: 20 })
//   var frame = spriteAnimator.frame
//   var currentFrame = spriteAnimator.currentFrame
//
//   t.equal(
//     frame,
//     currentFrame,
//     'currentFrame should get frame value from our props and set it to 20'
//   )
//   t.end()
// })
