// [1,2,3]
// 排列组合

const arr = [1, 2, 3]

function func(n, arr, value) {
  for (let i = 0; i < arr.length; i++) {
    var getValue = arr[i]
    var newArr = arr.slice()
    newArr.splice(i, 1)

    if (n > 0) {
      const newArr2 = value.slice()
      newArr2.push(getValue)
      func(n - 1, newArr, newArr2)
    }
    console.log(arr[i] + '----' + value)
  }
}

func(3, arr, [])
