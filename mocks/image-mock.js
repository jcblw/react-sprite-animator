export const createImageMock = ({ width, height }) => {
  const ogImage = global.Image
  let mock = {
    current: null,
    resetMock () {
      global.Image = ogImage
    },
  }
  global.Image = jest.fn().mockImplementation(() => {
    mock.current = {
      width,
      height,
      set onerror (fn) {
        // mock error
        this.triggerError = fn
      },
      set onload (fn) {
        // mock loaded
        this.triggerLoad = fn
      },
      set src (src) {
        this._src = src
      },
      get src () {
        return this._src
      },
    }
    return mock.current
  })

  return mock
}
