import React, { Component } from 'react'
import Layout from './components/Layout'
import Router from 'next/router'

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <div onClick={() => Router.push('/detail')}> hello world</div>
      </Layout>
    );
  }
}
