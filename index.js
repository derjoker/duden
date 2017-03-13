$(document).ready(() => {
  const VERSION = 'v1_788d' // v{n}_xxxx
  const word = location.href.split('/').pop()

  const duden = (function() {
    function wrap(el) {
      return $('<div>').append($(el).addClass(word)).html()
    }

    const key = [VERSION, word].join(' ')

    return {
      get: function() {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : {}
      },
      has: function(front) {
        front = wrap(front)
        const item = this.get()
        return item.hasOwnProperty(front)
      },
      set: function(front, back) {
        front = wrap(front)
        back = wrap(back)
        let item = this.get()
        item[front] = back
        this.save(item)
      },
      unset: function(front) {
        front = wrap(front)
        let item = this.get()
        delete item[front]
        this.save(item)
      },
      save: function(item) {
        localStorage.setItem(key, JSON.stringify(item))
      },
      remove: function() {
        localStorage.removeItem(key)
      },
    }
  })()

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

    const csv = new csvWriter()
		const data = encodeURIComponent(csv.arrayToCSV(array))
		const encodedUri = `data:text/csv;charset=utf-8,${data}`
		window.open(encodedUri)
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

    const button = $('<button>', {
      'text': duden.has(front) ? 'Remove' : 'Add'
    }).click((event) => {
      const target = $(event.target)
      if (target.text() === 'Add') {
        duden.set(front, back)
        target.text('Remove')
      }
      else {
        duden.unset(front)
        target.text('Add')
      }
    })
    $(gp).append(button)
  })
})

/**
 * Class for creating csv strings
 * Handles multiple data types
 * Objects are cast to Strings
 **/

function csvWriter(del, enc) {
    this.del = del || ','; // CSV Delimiter
    this.enc = enc || '"'; // CSV Enclosure

    // Convert Object to CSV column
    this.escapeCol = function (col) {
        if(isNaN(col)) {
            // is not boolean or numeric
            if (!col) {
                // is null or undefined
                col = '';
            } else {
                // is string or object
                col = String(col);
                if (col.length > 0) {
                    // use regex to test for del, enc, \r or \n
                    // if(new RegExp( '[' + this.del + this.enc + '\r\n]' ).test(col)) {

                    // escape inline enclosure
                    col = col.split( this.enc ).join( this.enc + this.enc );

                    // wrap with enclosure
                    col = this.enc + col + this.enc;
                }
            }
        }
        return col;
    };

    // Convert an Array of columns into an escaped CSV row
    this.arrayToRow = function (arr) {
        var arr2 = arr.slice(0);

        var i, ii = arr2.length;
        for(i = 0; i < ii; i++) {
            arr2[i] = this.escapeCol(arr2[i]);
        }
        return arr2.join(this.del);
    };

    // Convert a two-dimensional Array into an escaped multi-row CSV
    this.arrayToCSV = function (arr) {
        var arr2 = arr.slice(0);

        var i, ii = arr2.length;
        for(i = 0; i < ii; i++) {
            arr2[i] = this.arrayToRow(arr2[i]);
        }
        return arr2.join("\r\n");
    };
}
