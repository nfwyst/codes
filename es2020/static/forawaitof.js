function Gen(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time)
    }, time)
  })
}

async function test() {
  let arr = [Gen(2000), Gen(100), Gen(3000)]
  for await (let item of arr) {
    console.log(item)
  }
}

test()

const obj = {
  count: 0,
  Gen(time) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve({ done: false, value: time })
      }, time)
    })
  },
  [Symbol.asyncIterator]() {
    let self = this
    return {
      next() {
        self.count++
        if (self.count < 4) {
          return self.Gen(Math.random() * 1000)
        }
        return Promise.resolve({
          done: true,
          value: undefined
        })
      }
    }
  }
}

async function test1(obj) {
  for await (let item of obj) {
    console.log(item)
  }
}

test1(obj)
