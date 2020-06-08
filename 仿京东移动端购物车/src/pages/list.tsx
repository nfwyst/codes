/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  FC, useEffect, useCallback, useState,
} from 'react'
import { connect } from 'react-redux'
import { Good, CardState } from '../reducers/card'
import { getGoodsList, updatePageAction } from '../actions'
import { List } from 'antd-mobile'
import { useScroll } from '../hooks/useScroll'
import { useHistory } from 'react-router-dom'
const { Item } = List

interface ListProps {
  goods: Good[];
  getGoodsList: Function;
  total: number;
  page: number;
  updatePage: Function;
}

const pageSize = 10

export const ListPage: FC<ListProps> = props => {
  const [loading, setLoading] = useState(false)
  const { page } = props
  const history = useHistory()
  useEffect(() => {
    if (page * pageSize > props.goods.length) {
      props.getGoodsList({ page, pageSize, setLoading })
    }
  }, [page])
  const goToDetail = (id: string) => () => {
    history.push(`/detail/${id}`)
  }
  const handleScroll = useCallback(() => {
    const { scrollTop } = document.documentElement
    const { innerHeight } = window
    const { scrollHeight } = document.body
    if (scrollTop + innerHeight >= scrollHeight && page * pageSize < props.total) {
      props.updatePage(page + 1)
    }
  }, [page, props.total, props.updatePage])
  useScroll(handleScroll)
  return (
    <List renderHeader={() => '点击商品进入详情页'}>
      {
        props.goods.map(item => {
          return (
            <Item
              key={item.id}
              thumb={item.pic}
              multipleLine
              onClick={goToDetail(item.id)}
              className="hand"
            >
              {item.name}
              <p className="price">¥{(+item.price).toFixed(2)}</p>
            </Item>
          )
        })
      }
      <Item key={'loading-icon'} style={{ display: loading ? 'flex' : 'none' }}>
        <div id="spiner"></div>
      </Item>
    </List>
  )
}

export default connect(
  (state: CardState) => ({
    goods: state.goods,
    total: state.total,
    page: state.page,
  }),
  { getGoodsList, updatePage: updatePageAction }
)(ListPage)
