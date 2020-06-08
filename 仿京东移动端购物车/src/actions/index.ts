import axios from 'axios'
import { Dispatch } from 'redux'
import { Good, UpdateCard } from '../reducers/card';

type ActionType = 'addToCard' | 'removeFromCard' | 'updateGoods' | 'minusFromCard'

export interface Action<T> {
  type: ActionType;
  payload: T;
}

interface getGoodsListParam {
  page: number;
  pageSize: number;
  setLoading: Function;
}

export const getGoodsList = ({ page, pageSize, setLoading }: getGoodsListParam) => {
  return async (dispatch: Dispatch, getState: Function) => {
    const { goods } = getState()
    setLoading(true)
    const { data } = await axios.get('http://localhost:4000/list', {
      params: { page, pageSize }
    })
    setLoading(false)
    dispatch({
      type: 'updateGoods',
      payload: [...goods, ...data.data]
    })
    dispatch({
      type: 'updateTotal',
      payload: data.total
    })
  }
}

export const updatePageAction = (page: number) => {
  return {
    type: 'updatePage',
    payload: page
  }
}

export const addToCardAction = (good: Good) => {
  return {
    type: 'addToCard',
    payload: good
  }
}

export const removeFromCardAction = (good: Good) => {
  return {
    type: 'removeFromCard',
    payload: good
  }
}

export const updateFromCardAction = (updater: UpdateCard) => {
  return {
    type: 'updateFromCard',
    payload: updater
  }
}
