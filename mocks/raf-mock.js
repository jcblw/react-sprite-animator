// mock_requestAnimationFrame.js

class RequestAnimationFrameMockSession {
  constructor () {
    this.handleCounter = 0
    this.queue = new Map()
  }
  requestAnimationFrame (callback) {
    const handle = this.handleCounter++
    this.queue.set(handle, callback)
    return handle
  }
  cancelAnimationFrame (handle) {
    this.queue.delete(handle)
  }
  triggerNextAnimationFrame (time = performance.now()) {
    const nextEntry = this.queue.entries().next().value
    if (nextEntry === undefined) return

    const [nextHandle, nextCallback] = nextEntry

    nextCallback(time)
    this.queue.delete(nextHandle)
  }
  triggerAllAnimationFrames (time = performance.now()) {
    while (this.queue.size > 0) this.triggerNextAnimationFrame(time)
  }
  flush () {
    this.queue.clear()
    this.handleCounter = 0
  }
}

const ogRaf = global.requestAnimationFrame
const ogCaf = global.cancelAnimationFrame

export const createRafMock = () => {
  const requestAnimationFrameMock = new RequestAnimationFrameMockSession()

  global.requestAnimationFrame = requestAnimationFrameMock.requestAnimationFrame.bind(
    requestAnimationFrameMock
  )
  global.cancelAnimationFrame = requestAnimationFrameMock.cancelAnimationFrame.bind(
    requestAnimationFrameMock
  )

  return {
    current: requestAnimationFrameMock,
    resetMock () {
      requestAnimationFrameMock.flush()
      global.requestAnimationFrame = ogRaf
      global.cancelAnimationFrame = ogCaf
    },
  }
}
