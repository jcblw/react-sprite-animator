# React Sprite Animator

![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=jcblw/react-sprite-animator)

This is a component that animates through an image sprite.

- [Animated Heart Example](http://react-sprite-animator.surge.sh/)

<img src='https://raw.githubusercontent.com/jcblw/react-sprite-animator/master/examples/padman-go.gif' width='120px' height='134px'>

### Install

```shell
npm i react-sprite-animator -S
# or
yarn add react-sprite-animator
```

**React** is used with this library but do not come bundled with this library. Please make sure you have those installed before using.

### Usage

You are able to use this library as a component or as a hook.

#### The component

```javascript
import { SpriteAnimator } from 'react-sprite-animator'
...
<SpriteAnimator
  sprite="/path-to/sprite.svg"
  width={100}
  height={100}
/>
```

#### The hook

```javascript
import { useSprite } from 'react-sprite-animator'

const MyComponent = () => {
  const styles = useSprite({
    sprite: '/path-to/sprite.svg',
    width: 100,
    height: 100,
  })

  return <div style={style} />
}
```

### Props

This is the same for the hooks options and the props of the component.

- width **{number}** - width of clipped sprite (original, non-scaled dimensions)
- height **{number}** - height of clipped sprite (original, non-scaled dimensions)
- scale **{number}** - scale of the original sprite (default: 1, retina / @2x: 2)
- sprite **{string}** - path to sprite
- direction **{string}** - horizontal/vertical
- shouldAnimate **{bool}** - if the sprite should animate
- startFrame **{number}** - the frame to start animation
- fps **{number}** - the frame rate (frames per second) target
- stopLastFrame **{bool}** - stops animation from looping
- frame **{number}** - manually sets current frame
- onEnd **{function}** - callback when the animation finishes (only triggered when stopLastFrame is true)

**Only required for two-dimensional sprites**

- frameCount **{number}** - the total frame count of the sprite
- wrapAfter **{number}** - the row or column count of the sprite (direction: "horizontal" -> columns, "vertical" -> rows)
