import React, { useState } from 'react'
import { connect } from 'react-redux'

const Add = ({ addAction }) => {
  const [value, setValue] = useState('')
  const changeAction = ev => setValue(ev.target.value)
  const clickAction = ev => {
    ev.preventDefault()
    addAction(value)
  }
  return (
    <section>
      <h1>新增</h1>
      <form>
        <label htmlFor="title"></label>
        <input
          type="text"
          value={value}
          id="title"
          onChange={changeAction}
        />
        <button onClick={clickAction} type="submit">新增</button>
      </form>
    </section>
  )
}

const connecter = connect(
  null,
  (dispatch, props) => {
    return {
      addAction: value => dispatch({ type: 'add', payload: value })
    }
  }
)

export default connecter(Add)
