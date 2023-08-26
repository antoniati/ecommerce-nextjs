import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    images
}) {
    const [name, setName] = useState(existingName || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");

    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();

        const data = { name, description, price }

        if (_id) {
            await axios.put('/api/products', { ...data, _id })
        } else {
            await axios.post('/api/products', data)
        }

        router.push("/produtos");
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Nome do Produto</label>
            <input
                type="text"
                placeholder="Nome do Produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Descrição</label>
            <textarea
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Preço (BRL)</label>
            <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                type="submit"
                className="btn-primary mt-4"
            >
                Salvar
            </button>
        </form>
    );
}