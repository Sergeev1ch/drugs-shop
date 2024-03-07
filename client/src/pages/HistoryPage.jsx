import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import HistoryItem from "../components/HistoryItem";

const HistoryPage = () => {

    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    
    const searchOrders = async () => {
        try{
            if(search !== ''){
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/orders`, {
                    params: {
                        param: search
                    }
                });
                if(response.data.length > 0){
                    setOrders(response.data);
                }else{
                    alert('not found');
                }
            }
        }catch(error){
            alert('error request to server');
        }
    }

    return(
        <>
        <Header active='history'/>
        <div className='flex flex-col mx-4 border p-4 rounded-xl h-[90vh]'>
            <div className='border rounded-xl p-4 h-fit w-full'>
                <div className='w-1/5 mx-auto flex flex-col text-center'>
                    <label>Enter email or phone</label>
                    <input className='border mt-4 rounded-md px-2' onBlur={(e) => setSearch(e.target.value)}/>
                    <button className='mt-4 border rounded-md py-2' onClick={searchOrders}>Search</button>
                </div>
            </div>
            <div className='w-full border rounded-xl p-2 mt-4 h-[65vh] overflow-auto'>
            {orders.length > 0 && (
                <div className='border w-full rounded-lg p-2 flex flex-col gap-2'>
                    {orders.map((elem, index) => (
                        <HistoryItem key={index} cart={JSON.parse(elem.cart)} totalPrice={elem.cartTotal}/>
                    ))}
                </div>
            )}
            </div>
        </div>
        </>
    )
}

export default HistoryPage; 