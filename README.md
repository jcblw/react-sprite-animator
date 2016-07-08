# React Sprite Animator

[![Build Status](https://travis-ci.org/RadPad/react-sprite-animator.svg?branch=master)](https://travis-ci.org/RadPad/react-sprite-animator)

This is a component that animates through an image sprite. 

- [Animated Heart Example](http://react-sprite-animator.surge.sh/) 

<img src='https://raw.githubusercontent.com/RadPad/react-sprite-animator/master/examples/padman-go.gif' width='120px' height='134px'>


### Install

    $ npm i react-sprite-animator -S

### Usage

```html
<SpriteAnimator
  sprite='/path-to/sprite.svg'
  width={100}
  height={100}
/>
```

### Props

- width **{number}** - width of clipped sprite
- height **{number}** - height of clipped sprite
- sprite **{string}** - path to sprite
- direction **{string}** - horizontal/vertical
- shouldAnimate **{bool}** - if the sprite should animate
- startFrame **{number}** - the frame to start animation
- fps **{number}** - the frame rate (frames per second) target
- stopLastFrame **{bool}** - stops animation from looping

**Only required for two-dimensional sprites**

- frameCount **{number}** - the total frame count of the sprite
- wrapAfter **{number}** - the row or column count of the sprite (direction: "horizontal" -> columns, "vertical" -> rows)
