const CakeModel = require('../models/cakeModel');

exports.home = async (req, res) => {
    try {
        const [newProducts, topProducts] = await Promise.all([
            CakeModel.getNewProducts(),
            CakeModel.getTopProducts()
        ]);

        res.render("index", { newProducts, topProducts });
    } catch (error) {
        console.error('Failed to load products:', error);
        res.status(500).send('Failed to load products');
    }
};

exports.about = (req, res) => {
    res.render("about")
}


exports.contact = (req, res) => {
    res.render("contact")
}