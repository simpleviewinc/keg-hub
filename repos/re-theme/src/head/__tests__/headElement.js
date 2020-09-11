import React from 'react'
import * as ReactDOM from 'react-dom'

jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const mockCreatePortal = jest.fn()
const mockConsumer = jest.fn()
const mockProvider = jest.fn()
const createContext = jest.fn(value => {
  return { Consumer: mockConsumer, Provider: mockProvider }
})

let effectCB = null
const useEffect = jest.fn((cb, deps) => {
  effectCB = cb
  effectCB.deps = deps
})

let refMock = {}
let refCalls = 0
const useRef = jest.fn(value => {
  const ref = { current: value }
  refMock[refCalls] = ref
  refCalls++
  return ref
})

let shouldRender = false
const mockShouldRender = jest.fn(() => {
  return shouldRender
})

jest.setMock('react', { ...React, useRef, useEffect, createContext })
jest.setMock('react-dom', { ...ReactDOM, createPortal: mockCreatePortal })

const renderHeadElement = (props={}) => {
  const { HeadElement } = require('../headElement')

  return HeadElement({
    Tag: 'style',
    children: '.test { color: blue }',
    ...props,
  })
}

describe('HeadContext', () => {

  afterEach(() => {
    // Reset helper values
    effectCB = null
    refMock = {}
    refCalls = 0
    shouldRender = false

    // Clean up all mock functions
    useRef.mockClear()
    useEffect.mockClear()
    mockShouldRender.mockClear()
    mockCreatePortal.mockClear()

  })

  it('should wrap the response in the Head Consumer', () => {
    const headElement = renderHeadElement()
    
    expect(headElement.type).toBe(mockConsumer)
  })

  it('should call the shouldRender from the provider and return false if it should not render', () => {

    const headElement = renderHeadElement()
    headElement.props.children({ shouldRender: mockShouldRender })

    expect(mockShouldRender).toHaveBeenCalled()

  })

  it('should return false if it should not render', () => {

    const headElement = renderHeadElement()
    expect(headElement.props.children({ shouldRender: mockShouldRender })).toBe(false)

  })

  it('should call ReactDom.createPortal if it should render', () => {

    shouldRender = true
    const headElement = renderHeadElement()
    headElement.props.children({ shouldRender: mockShouldRender })

    expect(mockCreatePortal).toHaveBeenCalled()

  })

  it('should call createPortal with the correct tag', () => {

    shouldRender = true
    let headElement = renderHeadElement()
    headElement.props.children({ shouldRender: mockShouldRender })
    headElement = renderHeadElement({ tag: 'title' })
    headElement.props.children({ shouldRender: mockShouldRender })
    headElement = renderHeadElement({ tag: 'meta' })
    headElement.props.children({ shouldRender: mockShouldRender })
    headElement = renderHeadElement({ tag: 'link' })
    headElement.props.children({ shouldRender: mockShouldRender })

    expect(mockCreatePortal.mock.calls[0][0].type).toBe('style')
    expect(mockCreatePortal.mock.calls[1][0].type).toBe('title')
    expect(mockCreatePortal.mock.calls[2][0].type).toBe('meta')
    expect(mockCreatePortal.mock.calls[3][0].type).toBe('link')

  })

  it('should call createPortal with attaching to the head element', () => {

    shouldRender = true
    let headElement = renderHeadElement()
    headElement.props.children({ shouldRender: mockShouldRender })
    const element = mockCreatePortal.mock.calls[0][1]

    expect(element.toString()).toBe('[object HTMLHeadElement]')

  })

  it('should have the style prop overwrite the children when tag is style', () => {

    shouldRender = true

    let headElement = renderHeadElement({
      tag: 'style',
      style: '.test { color: blue; }',
      children: 'test'
    })

    headElement.props.children({ shouldRender: mockShouldRender })
    const element = mockCreatePortal.mock.calls[0][0]

    expect(element.props.children).toBe('.test { color: blue; }')

  })

  it('should NOT overwrite the children with style prop when tag is NOT style', () => {

    shouldRender = true
    let headElement = renderHeadElement({
      tag: 'title',
      style: '.test { color: blue; }',
      children: 'test'
    })
    headElement.props.children({ shouldRender: mockShouldRender })
    const element = mockCreatePortal.mock.calls[0][0]

    expect(element.props.children).toBe('test')

  })

  it('should set the headerTags Ref to the passed in context', () => {

    shouldRender = true
    const mockContext = { shouldRender: mockShouldRender, foo: 'bar' }
    let headElement = renderHeadElement()
    headElement.props.children(mockContext)

    expect(refMock[1].current).toBe(mockContext)

  })

  it('should call the useEffect hook', () => {

    const headElement = renderHeadElement()
    expect(useEffect).toHaveBeenCalled()

  })

  it('should call the useRef hook twice', () => {

    const headElement = renderHeadElement()
    expect(useRef).toHaveBeenCalledTimes(2)

  })

})
