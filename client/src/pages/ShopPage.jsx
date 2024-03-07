import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ShopCategory from "../components/ShopCategory";
import ShopItem from "../components/ShopItem";
import arrowUp from "../img/up-arrow.svg";
import arrowDown from "../img/down-arrow.svg";
import axios from "axios";

const ShopPage = () => {
    
    const [items, setItems] = useState([]);
    const [activeShop, setActiveShop] = useState('');
    const [shopList, setShopList] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedByName, setSortedByName] = useState(false);
    const [sortedByPrice, setSortedByPrice] = useState(false);
    const [sortedMode, setSortedMode] = useState('');
    const [favoriteList, setFavoriteList] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products`).then((res) => {
            setItems(res.data);
            setActiveShop(res.data[0].shop);
        }).catch(() => {
            alert('error get request with products or products array empty');
        });
        setCart(JSON.parse(localStorage.getItem('cart')));
    }, []); 

    useEffect(() => {
        let filtered;
        let favorite = JSON.parse(localStorage.getItem('favorite'));
        setFavoriteList(favorite);

        if(search !== ''){
            filtered = items.filter((elem) => elem.shop === activeShop && elem.name.toLowerCase().includes(search.toLowerCase()));
        }else{
            filtered = items.filter((elem) => elem.shop === activeShop);
        }

        if(favorite?.length > 0){
            setShopList(sortItems(filtered, favorite));
        }else{
            setShopList(filtered);
        }
    }, [activeShop, search]);

    const sortItems = (items, itemIds) => {
        return items.sort((a, b) => {
          const indexA = itemIds.indexOf(a.id);
          const indexB = itemIds.indexOf(b.id);
          
          if(indexA < indexB){
            return 1;
          }
          if(indexA > indexB){
            return -1;
          }
          return 0;
        });
    };

    const handleActiveShop = (value) => {
        setSortedMode('');
        setActiveShop(value);
    }

    const handleAddItem = (newItem) => {
        if(cart === null){
            setCart([{...newItem, quantity: 1}]);
            localStorage.setItem('cart', JSON.stringify([{...newItem, quantity: 1}]));
        }else{
            const isExist = cart.some(cartItem => cartItem.name === newItem.name);
            if(!isExist){
                setCart([...cart, {...newItem, quantity: 1}]);
                localStorage.setItem('cart', JSON.stringify([...cart, {...newItem, quantity: 1}]));
            }
        }
    }

    const handleAddFav = (newItem) => {
        if(favoriteList === null){
            setFavoriteList([newItem]);
            localStorage.setItem('favorite', JSON.stringify([newItem]));
        }else{
            if(!favoriteList.includes(newItem)){
                setFavoriteList([...favoriteList, newItem]);
                localStorage.setItem('favorite', JSON.stringify([...favoriteList, newItem]));
            }else{
                const temp = favoriteList.filter(item => item !== newItem);
                setFavoriteList(temp);
                localStorage.setItem('favorite', JSON.stringify(temp));
            }
        }
    }

    const handleSort = (sortBy) => {
        const sorted = [...shopList].sort((a, b) => {
            if(sortBy === 'name'){
                const sortOrder = sortedByName ? -1 : 1;
                setSortedMode(sortedByName ? 'NameDown' : 'NameUp');
                return sortOrder * a.name.localeCompare(b.name);
            }else if(sortBy === 'price'){
                const sortOrder = sortedByPrice ? -1 : 1;
                setSortedMode(sortedByPrice ? 'PriceDown' : 'PriceUp');
                return sortOrder * (a.price - b.price);
            }
        });
        if(sortBy === 'name'){
            setSortedByName(!sortedByName);
        }else if(sortBy === 'price'){
            setSortedByPrice(!sortedByPrice);
        }
        setShopList(sorted);
    }

    return(
        <>
            <Header active='shop'/>
            <main className='flex mx-4'>
                <aside className='w-1/4 flex flex-col border h-[90vh] items-center rounded-xl'>
                    <span className='font-bold my-4 text-2xl'>Shops</span>
                    {
                        [...new Set(items.map(item => item.shop))].map((elem, index) => (
                            <ShopCategory key={index} name={elem} onActiveShop={handleActiveShop} activeShop={activeShop}/>
                        ))
                    }
                </aside>
                <div className='w-3/4 ml-4'>
                    <div className='p-4 border rounded-xl'>
                        <input className='border px-2 rounded-md w-full' placeholder='Search Line' onChange={((e) => setSearch(e.target.value))}/>
                        <div className='mt-4 flex'>
                            Sorted by
                            <div className='flex items-center'>
                                <span className='ml-4 cursor-pointer' onClick={() => handleSort('name')}>Name</span>
                                {sortedMode === 'NameUp' && <img width={14} height={14} src={arrowUp} alt='' />}
                                {sortedMode === 'NameDown' && <img width={14} height={14} src={arrowDown} alt='' />}
                            </div>
                            <div className='flex items-center'>
                                <span className='ml-4 cursor-pointer' onClick={() => handleSort('price')}>Price</span>
                                {sortedMode === 'PriceUp' && <img width={14} height={14} src={arrowUp} alt='' />}
                                {sortedMode === 'PriceDown' && <img width={14} height={14} src={arrowDown} alt='' />}
                            </div>
                        </div>
                    </div>
                    <div className='h-[75vh] border rounded-xl p-4 overflow-auto grid grid-cols-3 gap-x-4 gap-y-8 mt-3'>
                        {
                            shopList.map((elem, index) => (
                                <ShopItem key={index} item={elem} onAddItem={handleAddItem} onFavItem={handleAddFav} favList={favoriteList}/>
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShopPage;