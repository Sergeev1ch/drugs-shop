const { Order } = require('../model');
const { Op } = require("sequelize");

exports.createOrder = async (req, res) => {
    try{
        const { clientName, email, phone, address, cart, cartTotal } = req.body;
        if(!clientName || !email || !phone || !address || !cart || !cartTotal){
            return res.sendStatus(400);
        }
        const order = await Order.create({
            clientName,
            email,
            phone,
            address,
            cart: JSON.stringify(cart),
            cartTotal
        });
        if(order){
            return res.sendStatus(201);
        }else{
            return res.sendStatus(500);
        }
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

exports.getOrders = async (req, res) => {
    try{
        const param = req.query.param;
        const orders = await Order.findAll({
            where: {
                [Op.or]: [
                    { email: param },
                    { phone: param },
                ]
            }
        });
        res.send(orders);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}