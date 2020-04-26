import React, { Component } from 'react'
import Layout from './components/Layout'

export default class NestStyle extends Component {
  render() {
    return (
      <Layout>
        <style jsx>{
          `
            h1 {
              background: blue;
            }
          `
        }</style>
        <h1> hello world </h1>
      </Layout>
    )
  }
}
