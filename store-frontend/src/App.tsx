import { useState } from 'react'
import './App.css'
import Sidebar from './sidebar/sidebar'

function App() {
  const [activeView, setActiveView] = useState('home')
  return (
    <>
    <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
      {/*<div>
        <CategoryMenu />
      </div>*/}
    </>
  )
}

export default App
