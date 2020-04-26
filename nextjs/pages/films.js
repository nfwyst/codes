import React, { Component } from 'react'
import Layout from './components/Layout'
import axios from 'axios'

export default class Films extends Component {
  static async getInitialProps() {
    try {
      const res = await axios.get('https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=8514605', {
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      })
      return {
        films: []
      }
    } catch (e) {
      return {
        films: []
      }
    }
  }

  render() {
    return (
      <Layout>
        <h2>电影</h2>
        <ul>
          {this.props.films.map(item => {
            return (
              <li key={item.filmId}>
                {item.name}
                <img src={item.poster} />
              </li>
            )
          })}
        </ul>
      </Layout>
    )
  }
}
