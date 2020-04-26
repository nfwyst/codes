import React, { Component } from 'react'
import Layout from './components/Layout'
import '../styles/list.sass'

export default class List extends Component {
  state = {
    list: ['hello', 'world']
  }

  render() {
    console.log('yes')
    return (
      <Layout>
        <ul>
          {this.state.list.map(item => (<li key={item}>{item}</li>))}
        </ul>
      </Layout>
    );
  }
}
