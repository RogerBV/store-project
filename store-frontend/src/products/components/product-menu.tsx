import { useEffect, useState } from "react";
import ProductSave from "./product-save";
import { IProduct } from "../entities/product.interface";
import { getProductsEndpoint } from "../endpoints/product-endpoint";
import ProductList from "./product-list";

export default function ProductMenu() {
    const [products, setProducts] = useState<IProduct[]>([])

    const getProducts = async () => {
        const result = await getProductsEndpoint();
        setProducts(result)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="lg:w-2/3">
                <ProductList productsParam={products} onListProducts={() => getProducts()} />
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