import { makeRequest } from "../../common/make-request"
import { ICategory } from "../entities/category.interface"

const URL = 'Categories'

export const saveCategoryEndpoint = async (objCategory: ICategory) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: objCategory.name
        })
    }
    const response = await makeRequest(URL, requestOptions)
    
    if (response.ok) {
        return await response.json()
    }
}

export const updateCategoryEndpoint = async (objCategory: ICategory) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objCategory)
    }
    const response = await makeRequest(URL, requestOptions)

    if (response.ok) {
        return await response.json()
    }
}

export const getCategoriesEndpoint = async() => {
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

export const getCategoryEndpoint = async(category_id: number) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await makeRequest(URL+'/'+category_id, requestOptions)

    if (response.ok) {
        return await response.json()
    }
}


export const deleteCategoryEndpoint = async (categoryId: number) => {
    const response = await makeRequest(`${URL}/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      if (response.ok) {
        return await response.json();
      }
}