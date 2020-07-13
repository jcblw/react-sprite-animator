import { renderHook, act } from '@testing-library/react-hooks'
import { useSprite } from './useSprite'
import heart from '../examples/heart.svg'
import { createImageMock } from '../mocks/image-mock'
import { createRafMock } from '../mocks/raf-mock'

jest.useFakeTimers()

describe('useSprite hook', () => {
  describe('the interface', () => {
    it('should return a set of styles', () => {
      const { result } = renderHook(() =>
        useSprite({ startFrame: 0, sprite: heart, width: 36, height: 36 })
      )

      expect(result.current.height).toBe('36px')
      expect(result.current.width).toBe('36px')
      expect(result.current.backgroundImage).toBe(null)
      expect(result.current.backgroundPosition).toBe(null)
      expect(result.current.backgroundSize).toBe('0px 0px')
    })
  })
  describe('the basic state changes', () => {
    it('should only show the background when the image is loaded', () => {
      const width = 36 * 10
      const height = 36
      const imageMock = createImageMock({ width, height })
      const { result } = renderHook(() =>
        useSprite({ startFrame: 0, sprite: heart, width, height: 36 })
      )

      expect(result.current.backgroundImage).toBe(null)
      expect(result.current.backgroundPosition).toBe(null)
      expect(result.current.backgroundSize).toBe('0px 0px')

      act(() => {
        imageMock.current.triggerLoad()
      })

      expect(result.current.backgroundImage).toBe(`url(${heart})`)
      expect(result.current.backgroundPosition).toBe('0px 0px')
      expect(result.current.backgroundSize).toBe(`${width}px ${height}px`)
    })

    it('should start the sprite at the startFrame', () => {
      const width = 36 * 2
      const height = 36
      const imageMock = createImageMock({ width, height })
      const { result } = renderHook(() =>
        useSprite({
          startFrame: 1,
          sprite: heart,
          width: 36,
          height: 36,
        })
      )

      act(() => {
        imageMock.current.triggerLoad()
      })

      expect(result.current.backgroundImage).toBe(`url(${heart})`)
      expect(result.current.backgroundPosition).toBe('-36px 0px')
      expect(result.current.backgroundSize).toBe('72px 36px')
    })
  })

  describe('the animations of sprites', () => {
    it('should animate frames horizontally', async () => {
      const width = 36 * 3
      const height = 36
      const imageMock = createImageMock({ width, height })
      const rafMock = createRafMock()
      const { result } = renderHook(() =>
        useSprite({
          startFrame: 0,
          sprite: heart,
          width: 36,
          height,
          fps: 1000,
        })
      )

      expect(result.current.backgroundImage).toBe(null)
      expect(result.current.backgroundPosition).toBe(null)
      expect(result.current.backgroundSize).toBe('0px 0px')

      act(() => {
        imageMock.current.triggerLoad()
      })

      expect(result.current.backgroundImage).toBe(`url(${heart})`)
      expect(result.current.backgroundPosition).toBe('0px 0px')
      expect(result.current.backgroundSize).toBe(`${width}px ${height}px`)

      act(() => {
        // step into initial animation set time back
        rafMock.current.triggerNextAnimationFrame(performance.now() - 5)
        rafMock.current.triggerNextAnimationFrame(performance.now() + 10)
      })

      expect(result.current.backgroundPosition).toBe('-36px 0px')

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 20)
      })

      expect(result.current.backgroundPosition).toBe(`-${36 * 2}px 0px`)

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 30)
      })

      expect(result.current.backgroundPosition).toBe('0px 0px')
    })

    it('should animate frames vertically', async () => {
      const height = 36 * 3
      const width = 36
      const imageMock = createImageMock({ width, height })
      const rafMock = createRafMock()
      const { result } = renderHook(() =>
        useSprite({
          startFrame: 0,
          sprite: heart,
          width,
          height: 36,
          fps: 1000,
          direction: 'verticle',
        })
      )

      expect(result.current.backgroundImage).toBe(null)
      expect(result.current.backgroundPosition).toBe(null)
      expect(result.current.backgroundSize).toBe('0px 0px')

      act(() => {
        imageMock.current.triggerLoad()
      })

      expect(result.current.backgroundImage).toBe(`url(${heart})`)
      expect(result.current.backgroundPosition).toBe('0px 0px')
      expect(result.current.backgroundSize).toBe(`${width}px ${height}px`)

      act(() => {
        // step into initial animation set time back
        rafMock.current.triggerNextAnimationFrame(performance.now() - 5)
        rafMock.current.triggerNextAnimationFrame(performance.now() + 10)
      })

      expect(result.current.backgroundPosition).toBe('0px -36px')

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 20)
      })

      expect(result.current.backgroundPosition).toBe(`0px -${36 * 2}px`)

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 30)
      })

      expect(result.current.backgroundPosition).toBe('0px 0px')
    })

    it('should wrap after frame in wrap after', async () => {
      const width = 36 * 2
      const height = 36 * 2
      const imageMock = createImageMock({ width, height })
      const rafMock = createRafMock()
      const { result } = renderHook(() =>
        useSprite({
          startFrame: 0,
          frameCount: 4,
          sprite: heart,
          width: 36,
          height: 36,
          fps: 1000,
          wrapAfter: 2,
        })
      )

      expect(result.current.backgroundImage).toBe(null)
      expect(result.current.backgroundPosition).toBe(null)
      expect(result.current.backgroundSize).toBe('0px 0px')

      act(() => {
        imageMock.current.triggerLoad()
      })

      expect(result.current.backgroundImage).toBe(`url(${heart})`)
      expect(result.current.backgroundPosition).toBe('0px 0px')
      expect(result.current.backgroundSize).toBe(`${width}px ${height}px`)

      act(() => {
        // step into initial animation set time back
        rafMock.current.triggerNextAnimationFrame(performance.now() - 5)
        rafMock.current.triggerNextAnimationFrame(performance.now() + 10)
      })

      expect(result.current.backgroundPosition).toBe('-36px 0px')

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 20)
      })

      expect(result.current.backgroundPosition).toBe('0px -36px')

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 30)
      })

      expect(result.current.backgroundPosition).toBe('-36px -36px')

      act(() => {
        rafMock.current.triggerNextAnimationFrame(performance.now() + 40)
      })

      expect(result.current.backgroundPosition).toBe('0px 0px')
    })
    it('should call onEnd only at the end of an animation', async () => {
      const width = 36 * 2
      const height = 36
      const imageMock = createImageMock({ width, height })
      const onEnd = jest.fn()
      const rafMock = createRafMock()
      renderHook(() =>
        useSprite({
          startFrame: 0,
          sprite: heart,
          width: 36,
          height: 36,
          fps: 1000,
          stopLastFrame: true,
          onEnd,
        })
      )

      act(() => {
        imageMock.current.triggerLoad()
      })

      expect(onEnd).not.toBeCalled()

      act(() => {
        // step into initial animation set time back
        rafMock.current.triggerNextAnimationFrame(performance.now() - 5)
        rafMock.current.triggerNextAnimationFrame(performance.now() + 10)
      })

      expect(onEnd).toBeCalled()
    })
  })
})
