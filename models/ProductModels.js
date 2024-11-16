const {Schema, model } = require('../connection');

const productSchema = new Schema({
      productName: {type: String, required: true},
      productModelCode: {type: String, required: true, unique: true, trim: true},
      price: {type: Number, required: true},
      description: {type: String, default:''},
      category: {type: String, required: true},
      stockQuantity: {type: Number, default: 0},
      createdAt: {type: Date, default: Date.now},
   
});

module.exports('product', productSchema);