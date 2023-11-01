const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./productController');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb+srv://lauccbu:Laucc129@cluster0.uib9x4u.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

// Routes
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.post('/products', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);
app.delete('/products', productController.removeAllProducts);
app.get('/products', productController.findProductsByName); 

app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});