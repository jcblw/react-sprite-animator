'use strict'

const React = require('react')
const {PropTypes, Component} = React
const noop = () => {}
const propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  sprite: PropTypes.string,
  direction: PropTypes.string,
  shouldAnimate: PropTypes.bool,
  loop: PropTypes.bool,
  startFrame: PropTypes.number,
  timeout: PropTypes.number,
  stopLastFrame: PropTypes.bool,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onEnd: PropTypes.func,
  frameCount: PropTypes.number,
  wrapAfter: PropTypes.number
}
const defaultProps = {
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
    const {sprite, width, height, direction, onError, onLoad, frameCount} = this.props
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
          maxFrames: frameCount || Math.floor(direction === 'horizontal' ?
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
    const {direction, width, height, wrapAfter} = options
    const isHorizontal = direction === 'horizontal'

    let row, col
    if (typeof wrapAfter === 'undefined') {
      row = isHorizontal ? 0 : frame
      col = isHorizontal ? frame : 0
    } else {
      row = isHorizontal ? Math.floor(frame / wrapAfter) : frame % wrapAfter
      col = isHorizontal ? frame % wrapAfter : Math.floor(frame / wrapAfter)
    }
    const _width = -width * col
    const _height = -height * row
    return `${_width}px ${_height}px`
  }

  reset () {
    this.setState({
      currentFrame: this.props.startFrame
    })
  }

  render () {
    const {sprite, width, height, className} = this.props
    const {isLoaded, currentFrame} = this.state
    const blockStyle = {
      backgroundImage: isLoaded ? `url(${sprite})` : null,
      backgroundPosition: isLoaded ? this.getSpritePosition(currentFrame, this.props) : null,
      width: `${width}px`,
      height: `${height}px`
    }
    return (
      <div className={className} style={blockStyle}></div>
    )
  }
}

SpriteAnimator.propTypes = propTypes
SpriteAnimator.defaultProps = defaultProps

module.exports = SpriteAnimator
