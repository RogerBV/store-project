import { useEffect, useState } from "react";
import Loading from "../../common/loading";
import { saveProductEndpoint } from "../endpoints/product-endpoint";
import { IProduct } from "../entities/product.interface";
import { ICategory } from "../../categories/entities/category.interface";
import { getCategoriesEndpoint } from "../../categories/endpoints/category-endpoint";

interface ProductSaveProps {
  onListProducts: () => void
}

export default function ProductSave({ onListProducts }: ProductSaveProps) {
    const [loading, setLoading] = useState(false)
    const [successfulSave, setSuccessfulSave] = useState(false)
    const [newProduct, setNewProduct] = useState(false)
    const [buttonNewProductText, setButtonNewProductText] = useState('New Product')
    const [objProduct, setObjProduct] = useState<IProduct>({ id: 0, name: '', price: 0, categoryId: 0, category_name: '' })

    const [categories, setCategories] = useState<ICategory[]>([])

    const getCategories = async () => {
        const result = await getCategoriesEndpoint()
        setCategories(result)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const cleanForm = () => {
        setObjProduct({ id: 0, name: '', price: 0, categoryId: 0, category_name: '' })
    }

    const enableSaveProduct = () => {
      if(!newProduct) {
        setNewProduct(true)
        setButtonNewProductText('Cancel')
        cleanForm()
        
      } else if (newProduct) {
          cleanForm()
          setNewProduct(false)
          setButtonNewProductText('New Product')
      }
    }

    const saveProductMethod = async () => {
      setLoading(true)
      await saveProductEndpoint(objProduct)
      await onListProducts();
      setSuccessfulSave(true)
      setNewProduct(false)
      cleanForm()
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
                Save Product
              </h1>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-8 py-10">
                <form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="productName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        disabled={!newProduct}
                        type="text"
                        id="productName"
                        name="productName"
                        placeholder="Enter the product name"
                        className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        value={objProduct?.name}
                        onChange={(e) => { if (objProduct) setObjProduct({ ...objProduct, name: e.target.value  }) } }
                      />
                    </div>

                    
                  </div>
                  <div>
                    <label htmlFor="txtPrice" className="block text-sm font-semibold text-gray-700 mb-2">
                        Price
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        disabled={!newProduct}
                        type="number"
                        id="txtPrice"
                        name="txtPrice"
                        placeholder="Enter price"
                        className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        value={objProduct?.price}
                        onChange={(e) => { if (objProduct) setObjProduct({ ...objProduct, price: Number(e.target.value)  }) } }
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="categorySelect" className="block text-sm font-semibold text-gray-700 mb-2">
                        Category
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>

                        <select
                            disabled={!newProduct}
                            id="categorySelect"
                            name="categorySelect"
                            className="block w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-gray-50 hover:bg-white focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                            value={objProduct?.categoryId}
                            onChange={(e) => {
                                if (objProduct) setObjProduct({ ...objProduct, categoryId: Number(e.target.value) });
                            }}
                        >
                            <option value={0}>Select a category</option>
                            {
                                categories.map((element: ICategory) => {
                                    return (
                                        <option value={element.id}>{element.name}</option>            
                                    )
                                })
                            }
                        </select>
                    </div>
                  </div>

                  

                    {/* Save Button */}
                    <div className="pt-4 flex flex-col lg:flex-row">
                      <button
                        id="btnNewProduct"
                        type="button"
                        className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white fond-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        onClick={() => enableSaveProduct()}
                      >{buttonNewProductText}</button>
                      <button
                        id="btnSaveNewProduct"
                        type="button"
                        className="lg:w-1/2 flex justify-center items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                        onClick={() => saveProductMethod()}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        
                        Save Product
                      </button>          
                    </div>
                    {
                      successfulSave && 
                      <div className="mt-8 text-center">
                        <p className="text-sm text-green-500 font-bold">
                          Saved Product
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