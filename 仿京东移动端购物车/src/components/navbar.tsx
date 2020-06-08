import { NavBar, Icon } from 'antd-mobile';
import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom'

interface NavBarProps {
  title?: string;
}

const getTitle = (pathname: string) => {
  switch (pathname) {
    case '/list':
      return '商品列表页'
    case '/card':
      return '购物车'
    default:
      return '商品详情页'
  }
}

export const NavBars: FC<NavBarProps> = props => {
  const history = useHistory()
  const location = useLocation()
  const handleBack = useCallback(() => {
    history.goBack()
  }, [history])
  const renderLeftContent = useCallback(() => {
    const { pathname } = location
    if (pathname === '/list') return null
    return <Icon type="left" onClick={handleBack} />
  }, [handleBack, location])
  return (
    <div>
      <NavBar
        mode="dark"
        leftContent={renderLeftContent()}
      >{getTitle(location.pathname)}</NavBar>
    </div>
  )
}
