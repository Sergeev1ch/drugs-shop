import React from "react";

const Header = (props) => {
    return(
        <>
            <header className='w-full px-8 py-4'>
                <a href="/" className={`text-blue-600 ${props.active === 'shop' ? 'font-bold underline' : ''}`}>Shop</a>
                <span className='mx-4'>|</span>
                <a href="/cart" className={`text-blue-600 ${props.active === 'cart' ? 'font-bold underline' : ''}`}>Shopping Cart</a>
                <span className='mx-4'>|</span>
                <a href="/coupon" className={`text-blue-600 ${props.active === 'coupon' ? 'font-bold underline' : ''}`}>Coupon</a>
                <span className='mx-4'>|</span>
                <a href="/history" className={`text-blue-600 ${props.active === 'history' ? 'font-bold underline' : ''}`}>History</a>
            </header>
        </>
    )
}

export default Header;