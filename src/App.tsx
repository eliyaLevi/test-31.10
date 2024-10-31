import { useState } from 'react'
import MissionList from "./components/MissionList/MissionList"
import './App.css'



export const App:React.FC = () => {
  return (
    <div className='app'>
      <MissionList/>
      </div>
  )
}


export default App
