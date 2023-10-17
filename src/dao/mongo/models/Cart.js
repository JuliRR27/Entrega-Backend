import { model, Schema, Types } from "mongoose";

let collection = "carts";

let schema = new Schema({
  products: [
    {
      _id: false,
      pid: { type: Types.ObjectId, ref: "products" },
      units: { type: Number },
    },
  ],
});

let Cart = model(collection, schema);

export default Cart;
