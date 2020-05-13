const authors = {
  all: {
    fiction: ['Agla', 'Skks', 'LP'],
    scienceFiction: ['Neal', 'Arthru', 'Ribert'],
    fantasy: ['J.R.Tole', 'J.M.R', 'Terry.P.K']
  },
  Address: []
}

authors[Symbol.iterator] = function () {
  let allAuthors = this.all
  let keys = Reflect.ownKeys(allAuthors)
  let values = []
  return {
    next() {
      if (!values.length) {
        if (keys.length) {
          values = allAuthors[keys[0]]
          keys.shift()
        }
      }
      return {
        done: !values.length,
        value: values.shift()
      }
    }
  }
}

for (let v of authors) {
  console.log(v)
}
