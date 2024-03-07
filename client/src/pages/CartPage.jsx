import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Header from "../components/Header";
import MapContainer from "../components/Map";
import CartItem from "../components/CartItem";
import { CouponList } from "./CouponPage";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

    const addressRef = useRef(null);
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [captcha, setCaptcha] = useState(false);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        clientName: '',
        email: '',
        phone: '',
        address: ''
    });

    const [error, setError] = useState({
        clientName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')));
    }, []);

    useEffect(() => {
        if(cart){
            let total = 0;
            for(const item of cart){
                total += item.price * item.quantity;
            }
            if(coupon && CouponList.hasOwnProperty(coupon)){
                const currentCoupon = CouponList[coupon];
                total -= (total / 100) * currentCoupon.discount;
            }
            setCartTotal(total);
        }
    }, [cart, coupon]);

    const handleChangeQuantity = (item, operation) => {
        const index = cart.findIndex(cartItem => cartItem.name === item.name);
        const tempCart = [...cart];
        let cartChanged = false;
        switch(operation){
            case 'increment':
                tempCart[index].quantity++;
                cartChanged = true;
                break;
            case 'decrement':
                if(tempCart[index].quantity > 1){
                    tempCart[index].quantity--;
                    cartChanged = true;
                }
                break;
            case 'remove':
                tempCart.splice(index, 1);
                cartChanged = true;
                break;
            default:
                break;
        }
        if(cartChanged) {
            setCart(tempCart);
            localStorage.setItem('cart', JSON.stringify(tempCart));
        }
    }

    const handleAddress = (value) =>{
        addressRef.current.value = value;
        setInputs(prev => ({...prev, address: value}));
    }

    async function validation() {
        let error = {};
        for(const key in inputs){
            if(inputs[key] === ''){
                error[key] = 'Not empty';
            }else{
                error[key] = '';
            }
        }
        setError(error);
        if(error.clientName === '' && error.email === '' && error.phone === '' && error.address === '' && captcha) {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders`, {
                ...inputs,
                cart,
                cartTotal
            }).then(() => {
                localStorage.removeItem('cart');
                setCart([]);
                navigate('/');
            }).catch(() => {
                alert('error created order');
            });
        }
    }

    const createOrder = () => {
        if(!cart || cart.length === 0){
            alert('Cart is empty');
        }else if(cart.length > 0){
            validation();
        }
    }

    const changeInputs = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const captchaChange = () =>{
        setCaptcha(true);
    }

    return(
        <>
        <Header active='cart'/>
        <main className='flex mx-4'>
            <aside className='w-1/2 border rounded-xl h-[90vh] flex p-4 flex-col'>
            <div style={{ width: '100%', height: 400, position: 'relative' }}>
                <MapContainer onAddress={handleAddress} currentAddress={inputs.address}/>
            </div>
                <label>Name:</label>
                <input name='clientName' type='text' className='border rounded-md px-2 mt-2 w-4/5' onBlur={changeInputs}/>
                {error.clientName !== '' && <label className='text-xs text-red-500'>{error.clientName}</label>}
                <label className='mt-4'>Email:</label>
                <input name='email' type='email' className='border rounded-md px-2 mt-2 w-4/5' onBlur={changeInputs}/>
                {error.email !== '' && <label className='text-xs text-red-500'>{error.email}</label>}
                <label className='mt-4'>Phone:</label>
                <input name='phone' type='tel' className='border rounded-md px-2 mt-2 w-4/5' onBlur={changeInputs}/>
                {error.phone !== '' && <label className='text-xs text-red-500'>{error.phone}</label>}
                <label className='mt-4'>Address:</label>
                <input name='address' type='text' ref={addressRef} className='border rounded-md px-2 mt-2 w-4/5' onBlur={changeInputs}/>
                {error.address !== '' && <label className='text-xs text-red-500'>{error.address}</label>}
            </aside>
            <div className='flex flex-col w-1/2'>
                <div className='ml-4 border rounded-xl h-[70vh] flex flex-col p-2 overflow-auto gap-y-4'>
                    {
                        cart?.map((item, index) => {
                            return(
                                <CartItem key={index} item={item} onChangeQuantity={handleChangeQuantity}/>
                            )
                        })
                    }
                </div>
                <div className='mt-8 pl-8 flex justify-between'>
                    <div className='flex flex-col'>
                        <input className='border w-1/3 rounded-lg px-2 mb-2' placeholder='coupon' value={coupon} onChange={(e) => setCoupon(e.target.value)}/>
                        <ReCAPTCHA
                            sitekey={process.env.REACT_APP_CAPTCHA_API_KEY}
                            onChange={captchaChange}
                        />
                    </div>
                    <div className='flex items-center justify-end mr-8'>
                        <span className='font-bold text-xl text-center'>Total price: {cartTotal}$</span>
                        <button className='border text-2xl font-bold px-4 py-2 rounded-xl ml-4' onClick={createOrder}>Submit</button>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default CartPage;