'use strict'

const React = require('react')
const {Component} = React
var PropTypes = require('prop-types')
const raf = require('raf')
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
  fps: PropTypes.number,
  stopLastFrame: PropTypes.bool,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onEnd: PropTypes.func,
  frameCount: PropTypes.number,
  wrapAfter: PropTypes.number
}
const defaultProps = {
  scale: 1,
  direction: 'horizontal',
  shouldAnimate: true,
  loop: true,
  startFrame: 0,
  fps: 60,
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
    this.prevTime = 0
    this.unmounting = false
    this.animate = this.animate.bind(this)
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
        if (this.unmounting) {
          return
        }
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

    const {shouldAnimate, fps, stopLastFrame, onEnd} = this.props
    if (shouldAnimate) {
      const {maxFrames, currentFrame} = this.state
      const nextFrame = currentFrame + 1 >= maxFrames ? 0 : currentFrame + 1

      if (!shouldAnimate) {
        return
      }
      if (nextFrame === 0 && stopLastFrame) {
        return onEnd()
      }
      this.interval = 1000 / fps

      this.animationId = raf(time => this.animate(nextFrame, time))
    }
  }

  animate (nextFrame, time) {
    if (this.unmounting) {
      return
    }

    if (!this.prevTime) {
      this.prevTime = time
    }

    const delta = time - this.prevTime
    if (delta < this.interval) {
      this.animationId = raf(time => this.animate(nextFrame, time))
      return
    }

    this.prevTime = time - (delta % this.interval)
    this.setState({currentFrame: nextFrame})
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

  componentWillUnmount () {
    this.unmounting = true
    this.animationId !== null && raf.cancel(this.animationId)
  }

  getSpritePosition (frame = 0, options = {}) {
    const {direction, width, height, wrapAfter, scale = 1} = options
    const isHorizontal = direction === 'horizontal'

    let row, col
    if (typeof wrapAfter === 'undefined') {
      row = isHorizontal ? 0 : frame
      col = isHorizontal ? frame : 0
    } else {
      row = isHorizontal ? Math.floor(frame / wrapAfter) : frame % wrapAfter
      col = isHorizontal ? frame % wrapAfter : Math.floor(frame / wrapAfter)
    }
    const _width = -width * col / scale
    const _height = -height * row / scale
    return `${_width}px ${_height}px`
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
