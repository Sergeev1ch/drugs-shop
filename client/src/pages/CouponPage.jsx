import React from "react";
import Header from "../components/Header";
import CouponItem from "../components/CouponItem";

export const CouponList = {
    sell5: {discount: 5, title: '5%'},
    sell10: {discount: 10, title: '10%'},
    sell15: {discount: 15, title: '15%'},
};

const CouponPage = () => {
    return(
        <>
        <Header active='coupon'/>
        <div className='mx-20 mt-8 flex gap-4'>
            {
                Object.keys(CouponList).map((couponName, index) => (
                    <CouponItem code={couponName} title={CouponList[couponName].title} key={index} />
                ))
            }
        </div>
        </>
    )
}

export default CouponPage;