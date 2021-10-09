import { createSlice } from "@reduxjs/toolkit";
import { destructureData } from '../../pages/prductspage'

async function fetchProducts(url=''){
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    })

    const data = await response.json();
    console.log(data)
    return data
}



export const countModifier = createSlice({

    name: 'data',
    initialState: {
        value: {
            "products": 0,
            "categories": 0,
        },
        status: 'idle'
    },
    reducers : {
        data: (state,action) => {
            state.value = {...state.value, "products": action.payload}
        },
        buttons: (state,action) => {
            state.value = {...state.value, "categories": action.payload}
        },
    }
}) 

export const initialfetch = () =>   
    {
        return async dispatch => {
            const fetchedData = await fetchProducts(`https://fakestoreapi.com/products/`);
            const fetchedCategories = await fetchProducts("https://fakestoreapi.com/products/categories")
            await dispatch(data(fetchedData));
            await dispatch(buttons(fetchedCategories));

        }
}

export const filterfetch = (query) =>   
    {
        return async dispatch => {
            const fetchedData = await fetchProducts(`https://fakestoreapi.com/products/category/${query}`);
            const fetchedCategories = await fetchProducts("https://fakestoreapi.com/products/categories")
            await dispatch(data(fetchedData));
            await dispatch(buttons(fetchedCategories));

        }
}


export const { data, buttons } = countModifier.actions;
export const countread = (state) => state.counter.value;
export default countModifier.reducer;