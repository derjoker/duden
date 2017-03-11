$(document).ready(() => {
  $('li.example-gp').each((index, gp) => {
    $('button', gp).remove()

    const children = $(gp).clone().children().toArray()
    const last = $('.example:last', gp).index()
    const front = $('<div>').append(children.slice(0,last+1))
    const back = $('<div>').append(children.slice(last+1))
    // console.log(gp, front, back)

    const button = $('<button>Add</button>')
    button.click(() => {
      console.log(front.html())
      console.log(back.html())
    })
    $(gp).append(button)
  })
})
