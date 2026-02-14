//import ProductUpdate from "./product-update"
import ProductDelete from "./product-delete"
import { IProduct } from "../entities/product.interface";
import ProductUpdate from "./product-update";

interface ProductListItemProps {
    key: number;
    product: IProduct
    index: number;
    onListProducts: () => void
}

export default function ProductListItem({ product, index, onListProducts }: ProductListItemProps) {
    return (
        <tr key={product.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-semibold text-sm">
                            {product.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">{product.id}</div>
                        <div className="text-sm text-gray-500">ID: #{product.id}</div>
                    </div>
                </div>
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {product.name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {product.price}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {product.category_name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                    <ProductUpdate productIdParam={product.id} onListProducts={onListProducts} />
                    <ProductDelete productIdParam={product.id} onListProducts={onListProducts} />
                </div>
            </td>
        </tr>
    )
}