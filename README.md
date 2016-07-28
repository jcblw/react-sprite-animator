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

- width **{number}** - width of clipped sprite (original, non-scaled dimensions)
- height **{number}** - height of clipped sprite (original, non-scaled dimensions)
- scale **{number}** - scale of the original sprite (default: 1, retina / @2x: 2)
- sprite **{string}** - path to sprite
- direction **{string}** - horizontal/vertical
- shouldAnimate **{bool}** - if the sprite should animate
- startFrame **{number}** - the frame to start animation
- fps **{number}** - the frame rate (frames per second) target
- stopLastFrame **{bool}** - stops animation from looping
