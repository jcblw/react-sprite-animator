# React Sprite Animator

This is a component that animates through a image sprite.

- [Animated Heart Example](http://react-sprite-animator.surge.sh/)

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
- timeout **{number}** - the amount of millisecond between frame
- stopLastFrame **{bool}** - stops animation from looping
