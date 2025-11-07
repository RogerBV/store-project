import { useEffect, useState } from "react";
import { ICategory } from "../entities/category.interface";
import CategoryList from "./category-list";
import { getCategoriesEndpoint, getCategoryEndpoint } from "../endpoints/category-endpoint";
import CategorySave from "./category-save";

export default function CategoryMenu() {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [updateStatus, setUpdateStatus] = useState(false)

    const getCategories = async () => {
        const result = await getCategoriesEndpoint();
        setCategories(result)
    }

    const enableEdit = async (id: number) => {
        const result = await getCategoryEndpoint(id)
        setUpdateStatus(true)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="lg:w-2/3">
                <CategoryList categoriesParam={categories} enableEditParam={enableEdit} onListCategories={() => getCategories()} />
            </div>
            <div className="lg:w-1/3">
                <div className="sticky top-6">
                    <CategorySave onListCategories={() => getCategories()} />
                </div>
            </div>
          </div>
        </div>
    )
}