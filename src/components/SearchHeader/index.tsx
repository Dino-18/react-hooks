import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import './index.scss'

interface Props {
  cityName: string,
  className: string,
}

const SearchHeader: FC<Props> = (props) => {
  const navigate = useNavigate()

  return (
    <div className={['search-box', props.className || ''].join(' ')}>
      <div className='search'>
        {/* 1. 城市选择 */}
        <div className="location" onClick={() => navigate('/citylist')}>
          <span className='name'>
            {props.cityName}
          </span>
          <i className='iconfont icon-arrow'></i>
        </div>
        {/* 2. 搜索 */}
        <div className="form" onClick={() => navigate('/search')}>
          <i className='iconfont icon-search'></i>
          <span className='text'>请输入小区或地址</span>
        </div>
      </div>

      {/* 3. 地图找房 */}
      <i className='iconfont icon-map' onClick={() => navigate('/map')}></i>
    </div>
  )
}

export default SearchHeader