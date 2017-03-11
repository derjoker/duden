$(document).ready(() => {
  $('li.example-gp').each((index, gp) => {
    const children = $(gp).clone().children().toArray()
    const last = $('.example:last', gp).index()
    const example = $('<div>').append(children.slice(0,last+1))
    const normal = $('<div>').append(children.slice(last+1))
    console.log(gp, example, normal)
  })
})
