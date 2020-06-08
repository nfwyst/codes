import React, {
  FC, useCallback, useState, ChangeEvent,
  MouseEvent,
} from 'react'
import { Good, CardState, CardItem } from '../reducers/card';
import { connect } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { addToCardAction } from '../actions/index';
import { Toast } from 'antd-mobile';
import cardIcon from '../assets/card.svg';
import { TabBar } from 'antd-mobile';

interface DetailProps {
  goods: Good[];
  addToCard: Function;
  cards: CardItem[];
}

export const Detail: FC<DetailProps> = props => {
  const { goods, addToCard, cards } = props
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const good = goods.find(item => item.id === params.id)
  const [num, setNum] = useState('1')
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    if ((/^\d+$/.test(text) || text === '') && text.length <= 3) {
      setNum(text)
    }
  }, [])
  const minusNum = useCallback((e: MouseEvent) => {
    if (+num > 1) setNum(`${+num - 1}`)
  }, [num])
  const addNum = useCallback((e: MouseEvent) => {
    if (+num < 999) setNum(`${+num + 1}`)
  }, [num])
  const handleAdd = useCallback((e: MouseEvent) => {
    Array(+num).fill(0).forEach(() => addToCard(good))
    Toast.info('加入购物车成功', 0.5)
  }, [addToCard, good, num])
  const goToCard = useCallback(() => {
    history.push('/card')
  }, [history])
  if (!good) return <Redirect to="/list" />
  const [bold, light] = (+good.price).toFixed(2).split('.')
  return (
    <div className="detail">
      <div className="wrapper">
        <img
          src={good.pic}
          alt={good.name} />
      </div>
      <p className="price">
        <span className="light">¥</span>
        <span className="bold">{bold}</span>
        <span className="light">.{light}</span>
      </p>
      <p className="desc">{good.desc}</p>
      <div className="numrow">
        <div className="input">
          <span onClick={minusNum} className={+num === 1 ? 'disabled' : ''}>-</span>
          <input type="text" value={num} onChange={handleChange} />
          <span onClick={addNum} className={+num === 999 ? 'disabled' : ''}>+</span>
        </div>
        <div className="add" onClick={handleAdd}>加入购物车</div>
      </div>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        <TabBar.Item
          title="购物车"
          key="card"
          onPress={goToCard}
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: `url(${cardIcon}) center center /  21px 21px no-repeat`,
              cursor: 'pointer'
            }}
            />
          }
          badge={cards.length}
          data-seed="logId"
        />
      </TabBar>
    </div>
  )
}

export default connect(
  (state: CardState) => {
    return {
      goods: state.goods,
      cards: state.cards,
    }
  },
  { addToCard: addToCardAction }
)(Detail)
