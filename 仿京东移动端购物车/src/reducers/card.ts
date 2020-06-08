import { Action } from '../actions'

export interface Good {
  pic: string;
  name: string;
  desc: string;
  price: string;
  id: string;
}

export interface CardItem {
  good: Good;
  num: number;
}

export interface CardState {
  goods: Good[];
  cards: CardItem[];
  total: number;
  page: number;
}

export interface UpdateCard {
  id: string;
  num: number;
}

class Strategy {
  constructor(private readonly state: CardState) { }
  addToCard = (item: Good) => {
    const { cards } = this.state
    const findIndex = cards.findIndex(i => i.good.id === item.id)
    if (findIndex !== -1) {
      const find = { ...cards[findIndex] }
      find.num += 1
      cards[findIndex] = find
      return {
        ...this.state,
        cards: [...cards]
      }
    } else {
      return {
        ...this.state,
        cards: [...cards, { good: item, num: 1 }]
      }
    }
  }

  removeFromCard = (item: Good) => {
    const { cards } = this.state
    return {
      ...this.state,
      cards: cards.filter(i => {
        return i.good.id !== item.id
      })
    }
  }

  minusFromCard = (item: Good) => {
    const { cards } = this.state
    return {
      ...this.state,
      cards: cards.map(i => {
        if (item.id === i.good.id) {
          i.num -= 1
        }
        return i
      })
    }
  }

  updateFromCard = (item: UpdateCard) => {
    const { cards } = this.state
    return {
      ...this.state,
      cards: cards.map(i => {
        if (item.id === i.good.id) {
          i.num = item.num
        }
        return i
      })
    }
  }

  updateGoods = (items: Good[]) => {
    return {
      ...this.state,
      goods: items
    }
  }

  updateTotal = (total: number) => {
    return {
      ...this.state,
      total
    }
  }

  updatePage = (page: number) => {
    return {
      ...this.state,
      page,
    }
  }
}

export const cardReducer = (state: CardState = {
  goods: [],
  cards: [],
  total: 0,
  page: 1,
}, action: Action<any>) => {
  const proceser = new Strategy(state)[action.type]
  if (!proceser) return state
  return proceser(action.payload)
}

export default cardReducer
