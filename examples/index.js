const React = require('../node_modules/react')
const ReactDOM = require('../node_modules/react-dom')
const { SpriteAnimator } = require('../src/index.fc')
import heart from './heart.svg'

console.log({ React: React.version, ReactDOM: ReactDOM.version })

const { useState } = React

const Sprite = () => {
  const [isLiked, setIsLiked] = useState(false)

  const onClick = () => {
    setIsLiked(!isLiked)
  }
  return (
    <div onClick={onClick}>
      <SpriteAnimator
        width={36}
        height={36}
        sprite={heart}
        shouldAnimate={isLiked}
        fps={60}
        startFrame={0}
        stopLastFrame={true}
        reset={!isLiked}
      />
    </div>
  )
}

const App = () => <Sprite />

ReactDOM.render(<App />, document.getElementById('sprite'))
