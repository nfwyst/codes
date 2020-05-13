let o = {
  name: 'xiaoming',
  price: 190
}

window.addEventListener('error', e => {
  console.log(e.message)
}, true)

let d = new Proxy(o, {
  get(target, p, receiver) {
    return target[p]
  },
  set(target, key, value) {
    if (Reflect.has(target, key)) {
      if (key === 'price') {
        if (value > 300) {
          throw new TypeError('price exceed 3000')
        } else {
          target[key] = value
        }
      } else {
        target[key] = value
      }
    } else {
      return false
    }
  }
})

d.price = 1000

console.log(d.price)
