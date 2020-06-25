import { renderHook, act } from '@testing-library/react-hooks'
import { useSprite } from './useSprite'
import heart from '../examples/heart.svg'
import { createImageMock } from '../mocks/image-mock'
import { createRafMock } from '../mocks/raf-mock'

jest.useFakeTimers()

describe('useSprite hook', () => {
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
        fps: 120,
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
      // step into initial animation
      rafMock.current.triggerNextAnimationFrame(performance.now() - 1000)
      rafMock.current.triggerNextAnimationFrame()
    })

    expect(result.current.backgroundPosition).toBe('-36px 0px')

    act(() => {
      // TODO need a more consistent way to trigger this
      rafMock.current.triggerNextAnimationFrame()
      rafMock.current.triggerNextAnimationFrame()
      rafMock.current.triggerNextAnimationFrame()
    })

    expect(result.current.backgroundPosition).toBe(`-${36 * 2}px 0px`)

    act(() => {
      rafMock.current.triggerNextAnimationFrame(performance.now() - 1000)
      rafMock.current.triggerNextAnimationFrame()
    })

    expect(result.current.backgroundPosition).toBe('0px 0px')
  })
  // test frame animation
  // test differnt orientation frame animation
  // test wrap
  // test start frame
})
