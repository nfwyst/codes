import React from 'react'
import { connect } from 'react-redux'

const List = ({ todos }) => {
  console.log(todos)
  return (
    <section>
      <h1>todo列表</h1>
      <ul>
        {
          todos.map(todo => {
            return (
              <li key={todo}>{todo}</li>
            )
          })
        }
      </ul>
    </section>
  )
}

const connecter = connect(
  ({ todos }) => ({ todos })
)

export default connecter(List)
