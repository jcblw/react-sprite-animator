import React from 'react'
import PropTypes from 'prop-types'
import { useSpriteAnimator } from './useSpriteAnimator'
export { useSpriteAnimator, loadImage } from './useSpriteAnimator'

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
  wrapAfter: PropTypes.number,
  frame: PropTypes.number,
  reset: PropTypes.bool,
}

export const SpriteAnimator = ({
  startFrame,
  sprite,
  width,
  height,
  direction,
  onError,
  onLoad,
  onEnd,
  frameCount,
  fps,
  shouldAnimate,
  stopLastFrame,
  reset,
  frame,
  className,
  scale,
  wrapAfter,
}) => {
  const style = useSpriteAnimator({
    startFrame,
    sprite,
    width,
    height,
    direction,
    onError,
    onLoad,
    onEnd,
    frameCount,
    fps,
    shouldAnimate,
    stopLastFrame,
    reset,
    frame,
    scale,
    wrapAfter,
  })

  return <div className={className} style={style} />
}

SpriteAnimator.propTypes = propTypes
SpriteAnimator.defaultProps = {
  scale: 1,
  direction: 'horizontal',
  shouldAnimate: true,
  loop: true,
  startFrame: 0,
  fps: 60,
  onError: noop,
  onLoad: noop,
  onEnd: noop,
}
