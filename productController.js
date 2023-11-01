const Product = require('./productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve products." });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product by ID." });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product." });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product." });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.json({ message: "Product deleted." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product." });
    }
};

exports.removeAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: "All products deleted." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting all products." });
    }
};

exports.findProductsByName = async (req, res) => {
    try {
        const keyword = new RegExp(req.query.name, 'i'); // Case-insensitive match
        const products = await Product.find({ name: keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products by name." });
    }
};
