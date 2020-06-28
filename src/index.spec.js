import React from 'react'
import TestRenderer from 'react-test-renderer'
import { SpriteAnimator } from '.'

describe('SpriteAnimator component', () => {
  it('should export properly', () => {
    expect(typeof SpriteAnimator).toBe('function')
  })

  it('should style a div width the given width and height', () => {
    const renderer = TestRenderer.create(
      <SpriteAnimator width={500} height={700} />
    )
    const div = renderer.root.findByType('div')

    expect(div.props.style.width).toBe('500px')
    expect(div.props.style.height).toBe('700px')
  })
})
