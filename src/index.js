'use strict'

const React = require('react')
const {PropTypes, Component} = React
const noop = () => {}
const propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  sprite: PropTypes.string,
  scale: PropTypes.number,
  direction: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  loop: PropTypes.bool,
  startFrame: PropTypes.number,
  timeout: PropTypes.number,
  stopLastFrame: PropTypes.bool,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onEnd: PropTypes.func
}
const defaultProps = {
  scale: 1,
  direction: 'horizontal',
  shouldAnimate: true,
  loop: true,
  startFrame: 0,
  timeout: 100,
  onError: noop,
  onLoad: noop,
  onEnd: noop
}

class SpriteAnimator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentFrame: props.startFrame,
      spriteWidth: 0,
      spriteHeight: 0
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
    const {sprite, width, height, direction, onError, onLoad} = this.props
    const {isLoaded, hasErrored} = this.state
    if (!isLoaded && !hasErrored) {
      SpriteAnimator.loadImage(sprite, (err, image) => {
        if (err) {
          onError(err)
          // dont trigger update
          this.state.hasErrored = true
          return
        }
        onLoad()
        this.setState({
          isLoaded: true,
          maxFrames: Math.floor(direction === 'horizontal' ?
            image.width / width :
            image.height / height
          ),
          spriteWidth: image.width,
          spriteHeight: image.height
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

    const {shouldAnimate, timeout, stopLastFrame, onEnd} = this.props
    if (shouldAnimate) {
      const {maxFrames, currentFrame} = this.state
      const nextFrame = currentFrame + 1 >= maxFrames ? 0 : currentFrame + 1
      if (nextFrame === 0 && stopLastFrame) {
        return onEnd()
      }
      setTimeout(() => {
        if (!this.props.shouldAnimate) return
        this.setState({currentFrame: nextFrame})
      }, timeout)
    }
  }

  componentWillReceiveProps ({sprite, reset, startFrame}) {
    const {sprite: lastSprite} = this.props
    const newState = {}
    if (sprite !== lastSprite) {
      newState.isLoaded = false
      newState.hasErrored = false
    }
    if (reset) {
      newState.currentFrame = startFrame
    }
    this.setState(newState)
  }

  getSpritePosition (frame = 0, options = {}) {
    const {direction, width, height, scale = 1} = options
    const isHorizontal = direction === 'horizontal'
    const _width = (isHorizontal ?  width * frame : 0) / scale
    const _height = (!isHorizontal ? height * frame : 0) / scale
    return `${!_width ? _width : `-${_width}`}px ${!_height ?  _height : `-${_height}`}px`
  }

  reset () {
    this.setState({
      currentFrame: this.props.startFrame
    })
  }

  render () {
    const {sprite, width, height, className, scale} = this.props
    const {isLoaded, currentFrame, spriteWidth, spriteHeight} = this.state
    const blockStyle = {
      backgroundImage: isLoaded ? `url(${sprite})` : null,
      backgroundPosition: isLoaded ? this.getSpritePosition(currentFrame, this.props) : null,
      backgroundSize: `${spriteWidth / scale}px ${spriteHeight / scale}px`,
      width: `${width / scale}px`,
      height: `${height / scale}px`
    }
    return (
      <div className={className} style={blockStyle}></div>
    )
  }
}

SpriteAnimator.propTypes = propTypes
SpriteAnimator.defaultProps = defaultProps

module.exports = SpriteAnimator
