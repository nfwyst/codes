import React, { FC, useCallback, ChangeEvent, MouseEvent } from 'react'
import { CardItem, CardState, Good } from '../reducers/card';
import { connect } from 'react-redux';
import { List } from 'antd-mobile'
import { useHistory } from 'react-router-dom'
import { removeFromCardAction, updateFromCardAction } from '../actions'
const { Item } = List

interface CardProps {
  cardItems: CardItem[];
  removeFromCard: Function;
  updateFromCard: Function;
}

export const Card: FC<CardProps> = props => {
  const history = useHistory()
  const { cardItems, removeFromCard, updateFromCard } = props
  const goToDetail = (id: string) => () => {
    history.push(`/detail/${id}`)
  }
  const getTotal = useCallback(() => {
    let total = 0
    cardItems.forEach(item => {
      total += item.num * (+item.good.price)
    })
    return total
  }, [cardItems])
  const deleteItem = useCallback((item: Good) => () => {
    removeFromCard(item)
  }, [removeFromCard])
  const handleNumChange = useCallback((item: Good) => (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if ((/^\d+$/.test(text) || text === '') && text.length <= 3) {
      updateFromCard({ id: item.id, num: +text })
    }
  }, [updateFromCard])
  const minusNum = useCallback((item: Good, num: number) => (e: MouseEvent) => {
    if (num > 1) updateFromCard({ id: item.id, num: num - 1 })
  }, [updateFromCard])
  const addNum = useCallback((item: Good, num: number) => (e: MouseEvent) => {
    if (num < 999) updateFromCard({ id: item.id, num: num + 1 })
  }, [updateFromCard])
  return (
    <>
      <List>
        {
          cardItems.length ? cardItems.map(item => {
            const { good, num } = item
            const [bold, light] = (+good.price).toFixed(2).split('.')
            return (
              <Item
                key={good.id}
                thumb={good.pic}
                multipleLine
              >
                <div
                  onClick={goToDetail(good.id)}
                  className="name overflow-text hand">
                  {item.good.name}
                </div>
                <div
                  className="overflow-text hand"
                  onClick={goToDetail(good.id)}
                  style={{ fontSize: '13px', color: '#888', margin: '5px 0' }}>
                  {good.desc}
                </div>
                <div className="numrow">
                  <p className="price">
                    <span className="light">¥</span>
                    <span className="bold">{bold}</span>
                    <span className="light">.{light}</span>
                  </p>
                  <div className="input">
                    <span onClick={minusNum(good, num)} className={+num === 1 ? 'disabled' : ''}>-</span>
                    <input
                      type="text"
                      value={num}
                      onChange={handleNumChange(good)}
                    />
                    <span onClick={addNum(good, num)} className={+num === 999 ? 'disabled' : ''}>+</span>
                  </div>
                  <div className="gopay" onClick={deleteItem(good)}>删除</div>
                </div>
              </Item>
            )
          }) : (
              <p style={{ textAlign: 'center', marginTop: 0, padding: '10px 30px' }}>购物车空空如也</p>
            )
        }
      </List>
      <div className="total-bar">
        <div>合计: <span>¥{getTotal().toFixed(2)}</span></div>
        <div className="gopay">去结算</div>
      </div>
    </>
  )
}

export default connect(
  (state: CardState) => ({ cardItems: state.cards }),
  {
    removeFromCard: removeFromCardAction,
    updateFromCard: updateFromCardAction,
  }
)(Card)
