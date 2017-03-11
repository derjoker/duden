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

  function get() {
    let array = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith(VERSION)) {
        const value = JSON.parse(localStorage.getItem(key))
        Object.keys(value).forEach((item) => {
          array.push([item, value[item]])
        })
      }
    }
    console.log(array)
  }

  $('button:contains("Save")').remove()

  const save = $('<button>Save</button>').click(() => get())
  $('h1#page-title').after(save)

  $('li.example-gp').each((index, gp) => {
    $('button', gp).remove()

    const children = $(gp).clone().children().toArray()
    const last = $('.example:last', gp).index()
    const front = $('<div>').append(children.slice(0,last+1))
    const back = $('<div>').append(children.slice(last+1))
    // console.log(gp, front, back)

    const button = $('<button>Add</button>').click(() => set(front, back))
    $(gp).append(button)
  })
})
