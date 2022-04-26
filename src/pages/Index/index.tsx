import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Swiper, Grid } from 'antd-mobile'

import SearchHeader from '../../components/SearchHeader'

import { httpGet } from '../../utils/http'

import './index.scss'

import getCurCity from '../../utils/index'

// 导入导航菜单图片
import Nav1 from '../../assets/images/nav-1.png';
import Nav2 from '../../assets/images/nav-2.png';
import Nav3 from '../../assets/images/nav-3.png';
import Nav4 from '../../assets/images/nav-4.png';

// 定义数据类型
interface Props {

}

interface swiperType {
  alt: string,
  id: number,
  imgSrc: string
}

interface groupType {
  title: string,
  desc: string,
  imgSrc: string,
}

interface newsType {
  id: number,
  title: string,
  from: string,
  date: string,
  imgSrc: string,
}

const navs = [{
  id: 1, src: Nav1, title: '整租', path: '/home/list'
}, {
  src: Nav2, title: '合租', path: '/home/list'
}, {
  src: Nav3, title: '地图找房', path: '/map'
}, {
  src: Nav4, title: '去出租', path: '/rent/add'
}]

const Index: FC<Props> = (props) => {
  const navigate = useNavigate()
  // 轮播图数据&状态
  const [swipers, setSwipers] = useState<swiperType[]>([])
  const [isSwiperLoaded, setSwiperLoaded] = useState<boolean>(false)

  // 租房小组数据
  const [groups, setGroups] = useState<groupType[]>([])

  //  最新资讯数据
  const [news, setNews] = useState<newsType[]>([])

  // 当前城市
  const [city, setCity] = useState<string>("上海")

  // 1. 获取轮播图数据
  async function getSwiper() {
    const res = await httpGet("/home/swiper")
    setSwipers(res.body)
    setSwiperLoaded(true)
  }
  // 2. 获取租房小组数据
  async function getGroups() {
    const res = await httpGet("/home/groups")
    setGroups(res.body)
  }
  // 3. 获取最新资讯
  async function getNews() {
    const res = await httpGet("/home/news")
    setNews(res.body)
  }
  // 4. 获取当前城市
  async function getCity() {
    const res = await getCurCity()
    setCity(res.label)
  }

  useEffect(() => {
    getSwiper()
  }, [])

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    getCity()
  }, [])

  useEffect(() => {
    getNews()
  }, [])

  // 1. 渲染轮播图数据
  function renderSwipers() {
    return (
      swipers.map((item, index) => (
        <Swiper.Item key={index}>
          <a
            key={item.id}
            href="http://www.baidu.com"
            style={{ display: 'inline-block', width: '100%' }}
          >
            <img
              src={`http://localhost:8080${item.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
              }}
            />
          </a>
        </Swiper.Item>
      ))
    )
  }

  // 2. 渲染导航栏数据
  function renderNavs() {
    return (
      <div className="navs">
        {navs.map(item => (
          <div className="navitems" key={item.id} onClick={() => navigate(item.path)}>
            <img src={item.src} alt="" />
            <h2>{item.title}</h2>
          </div>
        ))
        }
      </div>
    )
  }

  // 3. 渲染租房小组数据
  function renderGroups() {
    return (
      <div className='group'>
        <h3 className='group-title'>租房小组
          <span className='more'>更多</span>
        </h3>
        <Grid columns={2} gap={10}>
          {
            groups.map(item => (
              <Grid.Item className='group-item'>
                <div className="desc">
                  <p className="title">{item.title}</p>
                  <span className="info">{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Grid.Item>
            ))
          }
        </Grid>
      </div>
    )
  }

  // 4. 渲染最新资讯数据
  function renderNews() {
    return (
      <div className='news'>
        {
          news.map((item) =>
            <div className='home-news' key={item.id}>
              <div className='home-news-img'>
                <img style={{ width: '120px' }} src={`http://localhost:8080${item.imgSrc}`} alt=''></img>
              </div>
              <div className='home-news-title'>
                <h2 style={{ fontSize: '15px' }}>{item.title}</h2>
                <div className='home-news-source'>
                  <div>{item.from}</div>
                  <div>{item.date}</div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className="index">
      {/* 1. 轮播图 */}
      <div className='swiper'>
        {
          isSwiperLoaded ?
            <Swiper
              autoplay
              loop
            >
              {renderSwipers()}
            </Swiper>
            : ''
        }
      </div>
      {/* 2. 搜索栏 */}
      <SearchHeader className='index-search-header' cityName={city}></SearchHeader>
      {/* 3. 导航栏 */}
      {renderNavs()}
      {/* 4. 租房小组 */}
      {renderGroups()}
      {/* 5. 最新资讯 */}
      {renderNews()}
    </div>
  )
}

export default Index;