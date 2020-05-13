function* gen() {
  let val
  val = yield [1, 2, 3]
  console.log(val)
}

const l = gen()
console.log(
  l.next(10)
)
console.log(
  l.next(20)
)

function* gen1() {
  while (true) {
    try {
      yield 1
    } catch (error) {
      console.log(error.message)
    }
  }
}

const g1 = gen1()

console.log(g1.next())
console.log(g1.next())
console.log(g1.next())
console.log(g1.next())
g1.throw(new Error('died'))
