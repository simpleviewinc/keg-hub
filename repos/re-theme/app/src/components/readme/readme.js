import React, { useState, useEffect, useRef } from 'react'
import marked from "marked"
import { get } from "jsutils"
import readmePath from '../../Readme.md';
import { withTheme } from 're-theme'

export const Readme = withTheme(props => {

  const [ content, setContent ] = useState(null)
  const { theme, setHeight } = props
  const readmeRef = useRef()

  const sectionStyle = theme.join(
    get(theme, 'app.section'),
    get(theme, 'margin.bottom'),
    get(theme, 'padding.vert'),
    props.style
  )
  
  useEffect(() => {

    const articleEl = readmeRef.current
    const height = articleEl.offsetHeight > 0
      ? articleEl.offsetHeight + 50
      : articleEl.offsetHeight

    articleEl && setHeight(height)

    if(content) return
    
    fetch(readmePath)
      .then(response => response.text())
      .then(text => setContent(marked(text)))

  }, [ content, readmeRef, setHeight ])


  return (
    <section className="read-me-wrapper" style={ sectionStyle }>
      <article ref={ readmeRef } dangerouslySetInnerHTML={{__html: content}}></article>
    </section>
  )

})
