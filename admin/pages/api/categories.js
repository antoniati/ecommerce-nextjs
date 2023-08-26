import mongooseConnect from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        res.json(await Category.find().populate("parent"));
    }

    if (method === "POST") {
        const { name, subCategory } = req.body;
        const categoryDoc = await Category.create({
            name,
            parent: subCategory,
        });
        res.json(categoryDoc);
    }
    if (method === "PUT") {
        const { name, subCategory, _id } = req.body;
        const categoryDoc = await Category.updateOne({_id}, {
            name,
            parent: subCategory,
        });
        res.json(categoryDoc);
    }
    
    if (method === "DELETE") {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json("ok");
    }
} 