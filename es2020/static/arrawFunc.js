let test = {
  name: 'test',
  say: () => {
    console.log(this.name)
  }
}

test.say()
