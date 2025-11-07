import { useState } from "react";
import Loading from "../../common/loading";
import { saveCategoryEndpoint } from "../endpoints/category-endpoint";
import { ICategory } from "../entities/category.interface";

interface CategorySaveProps {
  onListCategories: () => void
}

export default function CategorySave({ onListCategories }: CategorySaveProps) {
    const [loading, setLoading] = useState(false)

    const [successfulSave, setSuccessfulSave] = useState(false)
    const [newCategory, setNewCategory] = useState(false)
    const [buttonNewCategoryText, setButtonNewCategoryText] = useState('New Category')

    const [objCategory, setObjCategory] = useState<ICategory>({ id: 0, name: '', status: 1 })


    const cleanObject = () => {
      setObjCategory({ id: 0, name: '', status: 1 })
    }

    const enableSaveCategory = () => {
      if(!newCategory) {
        setNewCategory(true)
        setButtonNewCategoryText('Cancel')
        cleanObject()
      } else if (newCategory) {
          cleanObject()
          setNewCategory(false)
          setButtonNewCategoryText('New Category')
      }
    }

    const saveCategoryMethod = async () => {
      setLoading(true)
      await saveCategoryEndpoint(objCategory)
      await onListCategories();
      setSuccessfulSave(true)
      setNewCategory(false)
      setLoading(false)
    }
      
  

    return (
        <div className="w-full">
          { loading && <Loading /> }
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Save Category
              </h1>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-8 py-10">
                <form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Category Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        disabled={!newCategory}
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        placeholder="Enter the category name"
                        className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        value={objCategory?.name}
                        onChange={(e) => { if (objCategory) setObjCategory({ ...objCategory, name: e.target.value  }) } }
                      />
                    </div>
                  </div>

                    {/* Save Button */}
                    <div className="pt-4 flex flex-col lg:flex-row">
                      <button
                        id="btnNewCategory"
                        type="button"
                        className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white fond-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        onClick={() => enableSaveCategory()}
                      >{buttonNewCategoryText}</button>
                      <button
                        id="btnSaveNewCategory"
                        type="button"
                        className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        onClick={() => saveCategoryMethod()}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        
                        Save Category
                      </button>          
                    </div>
                    {
                      successfulSave && 
                      <div className="mt-8 text-center">
                        <p className="text-sm text-green-500 font-bold">
                          Saved Category
                        </p>
                      </div>
                    }
                  </form>
                  </div>
                    
                    {/* Decorative bottom border */}
                    <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                </div>
          </div>
        </div>
    )
}