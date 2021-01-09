import React from 'react'

jest.resetModules()
jest.resetAllMocks()

const mockUseContext = jest.fn()
jest.setMock('react', { ...React, useContext: mockUseContext })

const mockReThemeContext = {}
jest.setMock('../../context/reThemeContext', {
  ReThemeContext: mockReThemeContext,
})

const { useTheme } = require('../useTheme')

describe('useTheme', () => {
  it('should call useContext', () => {
    mockUseContext.mockClear()
    useTheme()
    expect(mockUseContext).toHaveBeenCalled()
  })

  it('should pass the ReTheme context as the first argument', () => {
    mockUseContext.mockClear()
    useTheme()
    expect(mockUseContext.mock.calls[0][0]).toBe(mockReThemeContext)
  })
})
