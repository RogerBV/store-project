import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategoryMenu from './categories/components/category-menu'
import ProductMenu from './products/components/product-menu'
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
