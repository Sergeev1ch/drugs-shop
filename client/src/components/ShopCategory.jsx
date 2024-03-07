import React from "react";

const ShopCategory = (props) => {
    
    return(
        <>
            <div className={`w-1/2 border py-4 rounded-xl mb-4 text-center cursor-pointer ${props.activeShop === props.name ? 'bg-gray-200' : ''}`} onClick={() => props.onActiveShop(props.name)}>{props.name}</div>
        </>
    )
}

export default ShopCategory;