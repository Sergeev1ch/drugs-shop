const { Product } = require('../model');

exports.getProducts = async (req, res) => {
    try{
        const data = await Product.findAll();
        res.send(data);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}

exports.createProduct = async (req, res) => {
    try{
        const { name, img, price, shop } = req.body;
        if (!name || !img || !price || !shop) {
            return res.sendStatus(400);
        }
        await Product.create({
            name,
            img,
            price,
            shop
        });
        res.sendStatus(201);
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
}