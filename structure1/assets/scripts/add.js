class Create {
  constructor() {

  }

  fn() {
    const el = document.getElementById('test')
    el.addEventListener('click', helper.debounce(function () {
      fetch()
    }, 10))
  }
}

export default Create
