$(document).ready(() => {
  $('body').dblclick(() => {
    const selection = window.getSelection()
    const link = 'http://www.duden.de/suchen/englisch/' + selection.toString()
    window.open(link)
  })
})
