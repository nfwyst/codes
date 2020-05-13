let o = {
  name: 'xiaoming',
  price: 190
}

let d = Proxy.revocable(o, {
  get(target, key) {
    if (key === 'price') {
      return target[key] + 20
    } else {
      return target[key]
    }
  }
})

console.log(d.proxy)
