$(document).ready(() => {
  const VERSION = 'v1_788d' // v{n}_xxxx
  const word = location.href.split('/').pop()

  function set(front, back) {
    function wrap(el) {
      return $('<div>').append($(el).addClass(word)).html()
    }

    front = wrap(front)
    back = wrap(back)

    const key = [VERSION, word].join(' ')
    let value = localStorage.getItem(key)
    value = value ? JSON.parse(value) : {}

    value[front] = back

    localStorage.setItem(key, JSON.stringify(value))
  }

  $('li.example-gp').each((index, gp) => {
    $('button', gp).remove()

    const children = $(gp).clone().children().toArray()
    const last = $('.example:last', gp).index()
    const front = $('<div>').append(children.slice(0,last+1))
    const back = $('<div>').append(children.slice(last+1))
    // console.log(gp, front, back)

    const button = $('<button>Add</button>')
    button.click(() => {
      set(front, back)
    })
    $(gp).append(button)
  })
})
