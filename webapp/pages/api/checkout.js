import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SK)

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.json({
            message: "Should be a POST request"
        });
        return;
    }
    const {
        name,
        email,
        city,
        cep,
        street,
        phone,
        cartProducts,
    } = req.body;

    await mongooseConnect();
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)];
    const productsInfos = await Product.find({_id:uniqueIds})
    let line_items = [];
    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(product => product._id.toString() === productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: "BRL",
                    product_data: {
                        name: productInfo.name
                    },
                    unit_amount: quantity * productInfo.price * 100,
                }
            })
        }
    }
    const OrderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        cep,
        street,
        phone,
        paid: false,
    });
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        customer_email: email,
        success_url: process.env.PUBLIC_URL + "/sucesso",
        cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
        metadata: {orderId: OrderDoc._id.toString()},

    });

    res.json({
        url: session.url,
    })
}