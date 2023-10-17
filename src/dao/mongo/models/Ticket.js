import { model, Schema } from "mongoose";

let collection = 'ticket'

const schema = new Schema({
    purchase_date: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
})

const Ticket = model(collection, schema)

export default Ticket