import React from "react";
import minus from "../img/minus.svg";
import plus from "../img/plus.svg";
import remove from "../img/close.svg";

const CartItem = (props) => {
    return(
        <>
            <div className='border rounded-xl p-2 flex h-fit relative'>
                <img src={process.env.REACT_APP_SERVER_URL + '/api/public/' + props.item.img} alt='' className='w-1/3'/>
                <div className='w-2/3 flex flex-col items-center justify-center'>
                    <span className='font-bold text-2xl'>{props.item.name}</span>
                    <span>Price: {props.item.price}$</span>
                    <div className='flex mt-8 justify-center'>
                        <img width={14} height={14} src={minus} alt='' className='cursor-pointer' onClick={() => props.onChangeQuantity(props.item, 'decrement')}/>
                        <label type="number" className='border px-2 rounded-md hidden-arrows w-[50px] mx-4 text-center'>{props.item.quantity}</label>
                        <img width={14} height={14} src={plus} alt='' className='cursor-pointer' onClick={() => props.onChangeQuantity(props.item, 'increment')}/>
                    </div>
                </div>
                <img width={14} height={14} src={remove} className='absolute right-0 mt-2 mr-4 cursor-pointer' onClick={() => props.onChangeQuantity(props.item, 'remove')}/>
            </div>
        </>
    )
}

export default CartItem;