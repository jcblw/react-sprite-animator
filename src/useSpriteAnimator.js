const React = require('react')
const raf = require('raf')

const { caf } = raf
const { useState, useEffect, useCallback } = React

const noop = () => {}
const loadImage = (url, callback = noop) => {
  const img = new Image()
  img.onload = () => {
    callback(null, img)
  }
  img.onerror = err => {
    callback(err)
  }
  img.src = url
}

const useSpriteAnimator = ({
  startFrame = 0,
  sprite,
  width,
  height,
  direction = 'horizontal',
  onError = noop,
  onLoad = noop,
  onEnd = noop,
  frameCount,
  fps = 60,
  shouldAnimate = true,
  stopLastFrame,
  reset,
  frame,
  scale = 1,
  wrapAfter,
}) => {
  const [currentFrame, setCurrentFrame] = useState(startFrame)
  const [spriteWidth, setSpriteWidth] = useState(0)
  const [spriteHeight, setSpriteHeight] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasErrored, setHasErrored] = useState(false)
  const [maxFrames, setMaxFrames] = useState(0)
  const interval = 1000 / fps

  const loadSprite = useCallback(
    url => {
      let unmounted = false
      if (!isLoaded && !hasErrored) {
        loadImage(url, (err, image) => {
          if (unmounted) {
            return
          }
          if (err) {
            onError(err)
            setHasErrored(true)
            return
          }
          onLoad()
          setIsLoaded(true)
          setMaxFrames(
            frameCount ||
              Math.floor(
                direction === 'horizontal'
                  ? image.width / width
                  : image.height / height
              )
          )
          setSpriteWidth(image.width)
          setSpriteHeight(image.height)
        })
      }
      return () => (unmounted = true)
    },
    [sprite, isLoaded, hasErrored]
  )

  let prevTime
  const animate = useCallback(
    (nextFrame, time) => {
      if (prevTime) {
        prevTime = time
      }

      if (shouldAnimate) {
        const delta = time - prevTime
        if (delta < interval) {
          return raf(time => animate(nextFrame, time))
        }

        prevTime = time - (delta % interval)
        setCurrentFrame(nextFrame)
      } else {
        prevTime = 0
      }
    },
    [shouldAnimate]
  )

  const getSpritePosition = useCallback(
    (frame = 0) => {
      const isHorizontal = direction === 'horizontal'

      let row, col
      if (typeof wrapAfter === 'undefined') {
        row = isHorizontal ? 0 : frame
        col = isHorizontal ? frame : 0
      } else {
        row = isHorizontal ? Math.floor(frame / wrapAfter) : frame % wrapAfter
        col = isHorizontal ? frame % wrapAfter : Math.floor(frame / wrapAfter)
      }
      const _width = (-width * col) / scale
      const _height = (-height * row) / scale
      return `${_width}px ${_height}px`
    },
    [direction, width, height, wrapAfter, scale]
  )

  useEffect(() => {
    setIsLoaded(false)
    setHasErrored(false)
    return loadSprite(sprite)
  }, [sprite, loadSprite])

  useEffect(() => {
    if (shouldAnimate) {
      const nextFrame =
        currentFrame + 1 >= maxFrames ? startFrame : currentFrame + 1

      if (!shouldAnimate) {
        return
      }
      if (nextFrame === startFrame && stopLastFrame) {
        this.prevTime = 0 // need to store somewhere
        return onEnd()
      }

      let id = raf(time => {
        id = animate(nextFrame, time)
      })
      return () => caf(id)
    }
  }, [shouldAnimate, maxFrames, currentFrame, startFrame])

  useEffect(() => {
    setCurrentFrame(startFrame)
  }, [reset])

  useEffect(() => {
    setCurrentFrame(frame)
  }, [frame])

  return {
    backgroundImage: isLoaded ? `url(${sprite})` : null,
    backgroundPosition: isLoaded ? getSpritePosition(currentFrame) : null,
    backgroundSize: `${spriteWidth / scale}px ${spriteHeight / scale}px`,
    width: `${width / scale}px`,
    height: `${height / scale}px`,
  }
}

module.exports = { useSpriteAnimator }
