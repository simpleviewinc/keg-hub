import ReadMe from '../../README.md'

const iconMap = {
  install: '<i class="fas fa-clipboard-check"></i>',
  object: '<i class="fas fa-bullseye"></i>',
  string: '<i class="fas fa-grip-lines-vertical"></i>',
  method: '<i class="fas fa-atom"></i>',
  promise: '<i class="fas fa-spinner"></i>',
}

const headerFilter = [
  'api-methods'
]

const addNavItem = (navList, element) => {
  const linkWrp = document.createElement('li')
  const link = document.createElement('a')
  const cleaned = element
    .innerText
    .toLowerCase()
    .replace(/ /g, '-')

  if (headerFilter.indexOf(cleaned) !== -1) return

  element.id = `tipdig-nav-${cleaned}`
  link.setAttribute('href', `#${element.id}`)
  link.innerHTML = `${iconMap[cleaned] || ''}\n${element.innerText}`
  link.className = 'tipdig-link'
  linkWrp.appendChild(link)
  linkWrp.className = 'tipdig-link-wrapper'
  navList.appendChild(linkWrp)
}


document.addEventListener('DOMContentLoaded', () => {


  const compHW = document.getElementById('markdown-content')
  if(!compHW || !window.markdownit) return
  
  const markDown = window.markdownit({
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,
    quotes: '“”‘’',
    highlight: () => ('')
  })


  compHW.innerHTML = markDown.render(ReadMe)

  Array.from(document.getElementsByTagName('a'))
    .map(link => {
      link.setAttribute('target', '_blank')
    })

  const navList = document.getElementById('nav-list')
  navList && Array.from(compHW.getElementsByTagName('h2'))
    .map(element => {
      if (!element.id) addNavItem(navList, element)
    })

  navList && Array.from(compHW.getElementsByTagName('h3'))
    .map(element => {
      if (!element.id) addNavItem(navList, element)
    })

})
