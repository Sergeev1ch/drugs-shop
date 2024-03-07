import React from "react";

const HistoryProduct = ({product}) => {

    return(
        <div className='flex items-center w-1/3'>
            <img src={process.env.REACT_APP_SERVER_URL + '/api/public/' + product.img} alt='' width='30%'/>
            <div className='flex flex-col items-center'>
                <span className='font-bold text-xl'>{product.name}</span>
                <span>Amount: {product.quantity} pcs</span>
                <span>Price: {product.price}$</span>
            </div>
        </div>
    )
}

export default HistoryProduct;