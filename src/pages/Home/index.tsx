import React, { FC, ReactNode } from 'react'
import { TabBar } from 'antd-mobile'
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  MemoryRouter as Router,
} from 'react-router-dom'


import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'
import Index from '../Index'

import './index.scss';

// 引入好客租房字体图标样式
import "../../assets/fonts/iconfont.css"

interface TabBarType {
  key: string | null,
  title: ReactNode | ((active: boolean) => ReactNode),
  icon: ReactNode | ((active: boolean) => ReactNode),
}

const Bottom: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs: Array<TabBarType> = [
    {
      key: '/home',
      title: '首页',
      icon: <i className="iconfont icon-ind"></i>,
    },
    {
      key: '/home/list',
      title: '找房',
      icon: <i className="iconfont icon-findHouse"></i>,
    },
    {
      key: '/home/news',
      title: '资讯',
      icon: <i className="iconfont icon-infom"></i>,
    },
    {
      key: '/home/profile',
      title: '我的',
      icon: <i className="iconfont icon-my"></i>,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

const Home = () => {
  return (
    <div className="app">
      <div className="body">
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/list' element={<HouseList />} />
          <Route path='/news' element={<News />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      <div className="bottom">
        <Bottom />
      </div>
    </div>
  )
}

export default Home;