const mongoose = require('mongoose');	
		
const productSchema = new mongoose.Schema({	
    name: String,	
    price: Number,	
    tag: String,   // ví dụ: "new", "hot"	
    type: String   // "new" hoặc "top"	
});	
    
module.exports = mongoose.model('Product', productSchema, "products");