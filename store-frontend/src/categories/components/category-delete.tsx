import { useState } from "react";
import Loading from "../../common/loading";
import { deleteCategoryEndpoint } from "../endpoints/category-endpoint";


interface DeleteCategoryModalProps {
    categoryIdParam: number
    onListCategories: () => void
}

export default function DeleteCategory ({ categoryIdParam, onListCategories }: DeleteCategoryModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const deleteCategory = async () => {
        setLoading(true)
        await deleteCategoryEndpoint(categoryIdParam)
        await onListCategories()
        setLoading(false)
    }

    return (
        <>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-150"
                onClick={() => setIsOpen(true)}
            >
                <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
            </button>
            { loading && <Loading /> }
            {
                isOpen && 
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-xl p-6 w-96 max-w-[90%] animate-fadeIn"
                    >
                        <h2 className="text-left text-xl font-semibold mb-4 text-gray-800">
                            Delete Category
                        </h2>
                        <label className="text-left block text-sm font-semibold text-gray-700 mb-2">Do you want to delete this category?</label>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button type="button" onClick={() => deleteCategory()} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
                            <button type="button" onClick={() => setIsOpen(false) }  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                        </div>
                    </div>
                    
                </div>
            }
        </>
    )
}