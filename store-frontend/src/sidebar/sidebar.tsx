import { useState } from "react";
import CategoryMenu from "../categories/components/category-menu";
import ProductMenu from "../products/components/product-menu";

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-100 min-h-screen">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Mi App
        </div>
        <nav className="mt-6">
          <ul>
            <li className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${activeView === 'home' ? 'bg-gray-700' : ''}`}>
              <button 
                onClick={() => onViewChange('home')}
                className="flex items-center space-x-3 w-full text-left"
              >
                <span>🏠</span>
                <span>Inicio</span>
              </button>
            </li>
            <li className={`px-6 py-3 hover:bg-gray-700 ${activeView === 'categories' ? 'bg-gray-700' : ''}`}>
              <button
                onClick={() => onViewChange('categories')}
                className="w-full flex items-center space-x-3 w-full text-left"
              >
                <div className="flex items-center space-x-3">
                  <span>📁</span>
                  <span>Categories</span>
                </div>
              </button>
            </li>
            <li className={`px-6 py-3 hover:bg-gray-700 ${activeView === 'products' ? 'bg-gray-700' : ''}`}>
              <button
                onClick={() => onViewChange('products')}
                className="w-full flex items-center space-x-3 w-full text-left"
              >
                <div className="flex items-center space-x-3">
                  <span>📁</span>
                  <span>Products</span>
                </div>
              </button>
            </li>
            {/* Proyectos con submenu */}
            <li className={`px-6 py-3 hover:bg-gray-700 ${activeView === 'projects' ? 'bg-gray-700' : ''}`}>
              <button
                onClick={() => {
                  setIsProjectsOpen(!isProjectsOpen);
                  onViewChange('projects');
                }}
                className="w-full flex items-center justify-between focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span>📁</span>
                  <span>Proyectos</span>
                </div>
                <span>{isProjectsOpen ? "▲" : "▼"}</span>
              </button>
              {isProjectsOpen && (
                <ul className="mt-2 ml-6 text-gray-300">
                  <li className="py-1 hover:text-white cursor-pointer">
                    <button onClick={() => onViewChange('project1')} className="text-left">Proyecto 1</button>
                  </li>
                  <li className="py-1 hover:text-white cursor-pointer">
                    <button onClick={() => onViewChange('project2')} className="text-left">Proyecto 2</button>
                  </li>
                  <li className="py-1 hover:text-white cursor-pointer">
                    <button onClick={() => onViewChange('project3')} className="text-left">Proyecto 3</button>
                  </li>
                </ul>
              )}
            </li>

            <li className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${activeView === 'settings' ? 'bg-gray-700' : ''}`}>
              <button 
                onClick={() => onViewChange('settings')}
                className="flex items-center space-x-3 w-full text-left"
              >
                <span>⚙️</span>
                <span>Configuración</span>
              </button>
            </li>

            <li className={`px-6 py-3 hover:bg-gray-700 cursor-pointer ${activeView === 'help' ? 'bg-gray-700' : ''}`}>
              <button 
                onClick={() => onViewChange('help')}
                className="flex items-center space-x-3 w-full text-left"
              >
                <span>❓</span>
                <span>Ayuda</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className=" flex-1 p-6 bg-gray-100 min-h-screen">
        {activeView == 'categories' && <CategoryMenu />}
        {activeView == 'products' && <ProductMenu />}
        
        {/*activeView === 'help' && <Help />*/}
      </main>
    </div>
  );
}