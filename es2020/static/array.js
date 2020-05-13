const arr = [1, 2, 3, 4, 5]
for (let index = 0; index < arr.length; index++) {
  const element = arr[index]
  console.log(element)
}
arr.forEach(function (item) {
  console.log(item)
})
arr.every(function (item) {
  console.log(item)
  if (item === 3) return false
  return true
})

let arrs = Array.from({ length: 5 }, (_, index) => {
  return index + 1
})
console.log(arrs)
