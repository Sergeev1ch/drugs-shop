require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const sequelize = require('./db');
const router = express.Router();
const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use('/api/public', express.static(path.join(__dirname, 'public')));

router.get('/api/products', productController.getProducts);
router.post('/api/products', productController.createProduct);
router.post('/api/orders', orderController.createOrder);
router.get('/api/orders', orderController.getOrders);

app.use(router);

app.listen(port, () => {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
        return sequelize.sync();
    }).catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    console.log(`Server listening on port ${port}`);
});