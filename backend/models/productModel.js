const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minlength: 3,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxlength: [10, "Product price is too long"],
  },
  ratings: {
    type: Number,
    default: 0,
    required: [true, "Product ratings is required"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Product img id is required"],
      },
      url: {
        type: String,
        required: [true, "Product img url is required"],
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    maxlength: [5, "Product stock is too long"],
    default: 1,

  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: [true, "Product user is required"],
      },
      name:{
        type:String,
        required: [true, "Review name is required"],

      },
      ratings:{
        type:Number,
        required: [true, "Review rating is required"],
      },
      comment:{
        type:String,
        required: [true, "Review comment is required"],
      },

    }
  ] ,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: [true, "Product user is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;