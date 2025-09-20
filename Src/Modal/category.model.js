// Category.js (Node.js / Mongoose example)
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
