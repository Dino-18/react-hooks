import React, { FC } from 'react'
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
import News from './pages/News'
import Profile from './pages/Profile'

const App: FC<any> = () => {
  return(
        <div className='app'>
          <Router>
            <Routes>
              <Route path="/home/*" element={<Home />}/>
              <Route path="/citylist" element={<CityList />}/>
              <Route path="/" element={<Navigate to={'/home'} />}/>
            </Routes>
          </Router>
        </div>
  )
}

export default App;
