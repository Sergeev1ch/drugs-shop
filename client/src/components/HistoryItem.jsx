import React from "react";
import HistoryProduct from "./HistoryProduct";

const HistoryItem = ({cart, totalPrice}) => {

    return(
        <div className='flex justify-between border rounded-xl p-2'>
            <div className='flex w-3/4 flex-wrap gap-y-4'>
                {
                    cart.map((elem, index) => (
                        <HistoryProduct key={index} product={elem}/>
                    ))
                }
            </div>
            <div className='w-1/4 flex items-center font-bold text-xl'>Total Price: {totalPrice}$</div>
        </div>
    )
}

export default HistoryItem;