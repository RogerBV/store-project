import { useEffect, useState } from "react";
import ProductSave from "./product-save";
import { IProduct } from "../entities/product.interface";
import { getProductEndpoint, getProductsEndpoint } from "../endpoints/product-endpoint";
import ProductList from "./product-list";

export default function ProductMenu() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [updateStatus, setUpdateStatus] = useState(false)

    const getProducts = async () => {
        const result = await getProductsEndpoint();
        setProducts(result)
    }

    const enableEdit = async (id: number) => {
        const result = await getProductEndpoint(id)
        setUpdateStatus(true)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="lg:w-2/3">
                <ProductList productsParam={products} enableEditParam={enableEdit} onListProducts={() => getProducts()} />
            </div>
            <div className="lg:w-1/3">
                <div className="sticky top-6">
                    <ProductSave onListProducts={() => getProducts()} />
                </div>
            </div>
          </div>
        </div>
    )
}