import { ICategory } from "../entities/category.interface";
import CategoryUpdate from "./category-update"
import CategoryDelete from "./category-delete"

interface CategoryListItemProps {
    key: number;
    category: ICategory
    index: number;
    enableEditParam: (val: number) => void
    onListCategories: () => void
}

export default function CategoryListItem({ category, index, onListCategories }: CategoryListItemProps) {
    return (
        <tr key={category.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold text-sm">
                            {category.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">{category.id}</div>
                        <div className="text-sm text-gray-500">ID: #{category.id}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {category.name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                    <CategoryUpdate categoryIdParam={category.id} onListCategories={onListCategories} />
                    <CategoryDelete categoryIdParam={category.id} onListCategories={onListCategories} />
                </div>
            </td>
        </tr>
    )
}