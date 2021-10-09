import '../styles/productspage.css'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { data, countread, initialfetch, filterfetch } from '../features/counter/counterSlice'



export function destructureData(paramdata){
    if(paramdata["products"]){
        console.log(paramdata)
        const dataItem = paramdata["products"].map(element => {
                return(
                    <div key={`${element.id}`} className="grid-item">
                        <img className="grid-item-image" src={`${element.image}`}></img>
                        <div className="grid-item-title">{element.title}</div>
                        <div className="grid-item-desc">{element.description}</div>
                        <div className="grid-item-flex">
                        <div className="grid-flex1">Buy @ ₹{element.price}</div>
                        <div className="grid-flex2">{element.rating.rate}/5 rated by {element.rating.count}</div>
                        </div>
                    </div>
                )
            
        });
        console.log(dataItem)
        return(

            <div className="grid-box">
                {dataItem}
            </div>
        )
    }
}

function destructureButtons(paramdata,dispatch){
    const call = dispatch;
    if(paramdata["categories"]){
        console.log(paramdata)
        const dataItem = paramdata["categories"].map(element => {
                return(
                    <button key={`${element}`} className="button" onClick={() => call(filterfetch(element))}>
                        {element}
                    </button>
                )
            
        });
        console.log(dataItem)
        return(

            <div className="flex-buttons">
                <button key={`all`} className="button" onClick={() => call(initialfetch())}>
                        All
                </button>
                {dataItem}
            </div>
        )
    }
}



export default function Productspage(){

    const dispatch = useDispatch();
    const selector = useSelector(countread)
    
    useEffect(() => {
        const loadSpots = async () => {
        await dispatch(initialfetch())
        };
        loadSpots();
    }, [dispatch]);


    return(
        <div>
            <div>{destructureButtons(selector,dispatch)}</div>
            <div>{destructureData(selector)}</div>
        </div>
    )
}