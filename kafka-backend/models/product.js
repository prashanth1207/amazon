'use strict';
var mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  }
})

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Seller',
    required: true
  },
  productCategory: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  ratings: {
    type: Number,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [ImageSchema],
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5']
  },
  ratingAndReview: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'RatingAndReview',
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
},
{
  timestamps: true
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
