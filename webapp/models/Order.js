const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    cep: String,
    street: String,
    phone: Number,
    paid: Boolean,
});

export const Order = models?.Order || model("Order", OrderSchema);
