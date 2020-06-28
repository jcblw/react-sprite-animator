import { useState, useEffect, useCallback, useRef } from 'react'

const noop = () => {}
export const loadImage = (url, callback = noop) => {
  const img = new Image()
  img.onload = () => {
    callback(null, img)
  }
  img.onerror = err => {
    callback(err)
  }
  img.src = url
}

export const useSprite = ({
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
  scale = 1,
  wrapAfter,
}) => {
  const prevTime = useRef()
  const [currentFrame, setCurrentFrame] = useState(startFrame)
  const [spriteWidth, setSpriteWidth] = useState(0)
  const [spriteHeight, setSpriteHeight] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrored, setHasErrored] = useState(false)
  const [maxFrames, setMaxFrames] = useState(0)
  const interval = 1000 / fps

  const loadSprite = useCallback(
    url => {
      let unmounted = false
      if (!isLoading && (!isLoaded || !hasErrored)) {
        setIsLoading(true)
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
          setIsLoading(false)
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

  const animate = useCallback(
    (nextFrame, time) => {
      if (!prevTime.current) {
        prevTime.current = time
      }

      if (shouldAnimate) {
        const delta = time - prevTime.current
        if (delta < interval) {
          return requestAnimationFrame(time => animate(nextFrame, time))
        }

        prevTime.current = time - (delta % interval)
        setCurrentFrame(nextFrame)
      } else {
        prevTime.current = 0
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
  }, [sprite])

  useEffect(() => {
    if (shouldAnimate) {
      const nextFrame =
        currentFrame + 1 >= maxFrames ? startFrame : currentFrame + 1

      if (!shouldAnimate) {
        return
      }
      if (nextFrame === startFrame && stopLastFrame) {
        return onEnd()
      }

      let id = requestAnimationFrame(time => {
        id = animate(nextFrame, time)
      })
      return () => {
        cancelAnimationFrame(id)
      }
    }
  }, [shouldAnimate, maxFrames, currentFrame, startFrame])

  useEffect(() => {
    setCurrentFrame(startFrame)
  }, [reset])

  return {
    backgroundImage: isLoaded ? `url(${sprite})` : null,
    backgroundPosition: isLoaded ? getSpritePosition(currentFrame) : null,
    backgroundSize: `${spriteWidth / scale}px ${spriteHeight / scale}px`,
    width: `${width / scale}px`,
    height: `${height / scale}px`,
  }
}
