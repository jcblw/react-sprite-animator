const React = require('react')
const ReactDOM = require('react-dom')
const SpriteAnimator = require('../lib/').default

class Sprite extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLiked: false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    const {isLiked} = this.state
    this.setState({isLiked: !isLiked})
  }

  render () {
    const {isLiked} = this.state
    return (
      <div onClick={this.onClick}>
        <SpriteAnimator
          ref='sprite'
          width={100}
          height={100}
          sprite='./heart.png'
          shouldAnimate={isLiked}
          timeout={20}
          startFrame={0}
          stopLastFrame={true}
          reset={!isLiked}
        />
      </div>
    )
  }
}

ReactDOM.render(<Sprite/>, document.getElementById('sprite'))
