import React, { useState } from "react";
import star from "../img/star.svg";
import starFill from "../img/star-fill.svg";

const ShopItem = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () =>{
        props.onAddItem(props.item);
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 1000);
    }

    return(
        <>
            <div className='w-full border rounded-xl p-2 flex flex-col h-fit relative'>
                <img className='h-[250px]' src={process.env.REACT_APP_SERVER_URL + '/api/public/' + props.item.img} alt=''/>
                <span className='font-bold text-2xl'>{props.item.name}</span>
                <span className=''>Price: {props.item.price}$</span>
                <button className='w-fit border rounded-xl px-8 py-2 self-end' onClick={handleButtonClick}>add to Cart</button>
                <img className='absolute cursor-pointer' width={30} height={30} src={props.favList?.includes(props.item.id) ? starFill : star} alt='' onClick={() => props.onFavItem(props.item.id)}/>
                {showModal && 
                    <div className='border p-4 rounded-lg w-1/2 absolute bottom-0 right-0 -mb-20 bg-gray-300 z-10'>
                        <span className='text-sm'>The item should be added in the Shopping Cart</span>
                    </div>
                }
            </div>
        </>
    )
}

export default ShopItem;