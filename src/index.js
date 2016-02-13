import React, {PropTypes, Component} from 'react'
const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  sprite: PropTypes.string,
  direction: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  loop: PropTypes.bool,
  startFrame: PropTypes.number,
  timeout: PropTypes.number,
  stopLastFrame: PropTypes.bool
}
const defaultProps = {
  direction: 'horizontal',
  shouldAnimate: true,
  loop: true,
  startFrame: 0,
  timeout: 100
}

class SpriteAnimator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentFrame: props.startFrame
    }
  }

  static loadImage (url = '', callback = () => {}) {
    const img = new Image()
    img.onload = () => {
      callback(null, img)
    }
    img.onerror = err => {
      callback(err)
    }
    img.src = url
  }

  loadSprite () {
    const {sprite, width, height, direction} = this.props
    const {isLoaded, hasErrored} = this.state
    if (!isLoaded && !hasErrored) {
      SpriteAnimator.loadImage(sprite, (err, image) => {
        if (err) {
          // dont trigger update
          this.state.hasErrored = true
          return
        }
        this.setState({
          isLoaded: true,
          maxFrames: Math.floor(direction === 'horizontal' ?
            image.width / width :
            image.height / height
          )
        })
      })
    }
  }

  componentDidMount () {
    this.loadSprite()
  }

  componentDidUpdate () {
    if (!this.state.isLoaded) {
      return this.loadSprite()
    }

    const {shouldAnimate, timeout, stopLastFrame} = this.props
    if (shouldAnimate) {
      const {maxFrames, currentFrame} = this.state
      const nextFrame = currentFrame + 1 >= maxFrames ? 0 : currentFrame + 1
      if (nextFrame === 0 && stopLastFrame) return
      setTimeout(() => {
        if (!this.props.shouldAnimate) return
        this.setState({currentFrame: nextFrame})
      }, timeout)
    }
  }

  componentWillReceiveProps ({sprite, reset, startFrame}) {
    const {sprite: lastSprite} = this.props
    const newState = {}
    if (sprite === lastSprite) {
      newState.isLoaded = false
      newState.hasErrored = false
    }
    if (reset) {
      newState.currentFrame = startFrame
    }
    this.setState(newState)
  }

  getSpritePosition (frame = 0, options = {}) {
    const {direction, width, height} = options
    const isHorizontal = direction === 'horizontal'
    const _width = isHorizontal ?  width * frame : 0
    const _height = !isHorizontal ? height * frame : 0
    return `${!_width ? _width : `-${_width}`}px ${!_height ?  _height : `-${_height}`}px`
  }

  reset () {
    this.setState({
      currentFrame: this.props.startFrame
    })
  }

  render () {
    const {sprite, width, height} = this.props
    const {isLoaded, currentFrame} = this.state
    const blockStyle = isLoaded ? {
      backgroundImage: `url(${sprite})`,
      backgroundPosition: this.getSpritePosition(currentFrame, this.props),
      width: `${width}px`,
      height: `${height}px`
    } : null
    return (
      <div style={blockStyle}></div>
    )
  }
}

SpriteAnimator.propTypes = propTypes
SpriteAnimator.defaultProps = defaultProps

export default SpriteAnimator
