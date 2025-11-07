import { useState } from "react"
import Loading from "../../common/loading"
import { ICategory } from "../entities/category.interface"
import { getCategoryEndpoint, updateCategoryEndpoint } from "../endpoints/category-endpoint"

interface CategoryUpdateProps {
  categoryIdParam: number
  onListCategories: () => void
}

export default function CategoryUpdate({ categoryIdParam, onListCategories }: CategoryUpdateProps) {
    const [loading, setLoading] = useState(false)
    const [objCategory, setObjCategory] = useState<ICategory>({ id: 0, name: '' })
    const [isOpen, setIsOpen] = useState(false)

    const updateCategoryMethod = async () => {
      setLoading(true)
      await updateCategoryEndpoint(objCategory)
      await onListCategories();
      setLoading(false)
      setIsOpen(false)
    }

    const openModal = async () => {
      setIsOpen(true)
      const result = await getCategoryEndpoint(categoryIdParam)
      setObjCategory(result)
    }

    return (
      <>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            onClick={() => openModal()}
          >
            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
              Edit
          </button>
          { loading && <Loading /> }
          {
              isOpen && 
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
                  <div
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-2xl shadow-xl p-6 w-96 max-w-[90%] animate-fadeIn"
                  >
                      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-left">
                          Update Category
                      </h2>
                      <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                          <div className="px-8 py-10">
                            <div className="space-y-6">
                              <div>
                                <label htmlFor="categoryName" className="block text-sm font-semibold text-gray-700 mb-2 text-left">
                                  Category Name
                                </label>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  </div>
                                  <input
                                    type="text"
                                    id="categoryName"
                                    name="categoryName"
                                    placeholder="Enter the category name"
                                    className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    value={objCategory.name}
                                    onChange={(e) => { setObjCategory({ ...objCategory, name: e.target.value  }) }}
                                  />
                                </div>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          { /*flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl */ }
                          <button type="button" onClick={() => updateCategoryMethod()} className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 sm:ml-3 sm:w-auto">Update</button>
                          <button type="button" onClick={() => setIsOpen(false) }  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                      </div>
                  </div>
                  
              </div>
          }
      </>
  )
}