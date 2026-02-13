import { makeRequest } from "../../common/make-request"
import { IProduct } from "../entities/product.interface"

const URL = 'Products'

export const saveProductEndpoint = async (objProduct: IProduct) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: objProduct.name,
            price: objProduct.price,
            categoryId: objProduct.categoryId
        })
    }

    const response = await makeRequest(URL, requestOptions)
    
    if (response.ok) {
        return await response.json()
    }
}

export const updateProductEndpoint = async (objProduct: IProduct) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objProduct)
    }
    const response = await makeRequest(URL, requestOptions)

    if (response.ok) {
        return await response.json()
    }
}

export const getProductsEndpoint = async() => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await makeRequest(URL, requestOptions)

    if (response.ok) {
        return await response.json()
    }
}

export const getProductEndpoint = async(product_id: number) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await makeRequest(URL+'/'+product_id, requestOptions)

    if (response.ok) {
        return await response.json()
    }
}


export const deleteProductEndpoint = async (product_id: number) => {
    const response = await makeRequest(`${URL}/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (response.ok) {
        return await response.json();
      }
}