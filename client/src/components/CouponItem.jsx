import React, {useState} from "react";
import couponImg from "../img/coupon.svg";

const CouponItem = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () =>{
        navigator.clipboard.writeText(props.code);
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 1000);
    }

    return(
        <>
        <div className='border rounded-lg w-1/4 flex flex-col items-center p-2 relative'>
            <img src={couponImg} width={200} alt='' />
            <span className='self-start'>{props.title} Discount ({props.code})</span>
            <button className='border px-8 py-1 rounded-xl self-end' onClick={handleButtonClick}>Copy</button>
            {showModal && 
                <div className='border p-4 rounded-lg w-1/2 absolute bottom-0 right-0 -mb-14 bg-gray-300 z-10'>
                    <span className='text-sm'>Copied to clipboard</span>
                </div>
            }
        </div>
        </>
    )
}

export default CouponItem;