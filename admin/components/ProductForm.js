import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "./Spinner";

export default function ProductForm({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    images: existingImages
}) {
    const [name, setName] = useState(existingName || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    async function saveProduct(e) {
        e.preventDefault();

        const data = { name, description, price, images }

        if (_id) {
            await axios.put('/api/products', { ...data, _id })
        } else {
            await axios.post('/api/products', data)
        }

        router.push("/produtos");
    }

    async function uploadImages(e) {
        const files = e.target?.files;
        if (files.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post("/api/upload", data)
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            })
            setIsUploading(false);
        };
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
            <label>Fotos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt="Imagem do produto" className="rounded-md"/>
                    </div>
                ))}
                {isUploading && (
                    <div className="h-24 flex items-center">
                        <Spinner />
                    </div>
                )}
                <label
                    className="w-24 h-24 border rounded-md cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 bg-gray-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" className="hidden" onChange={uploadImages} />
                </label>
                {!images?.length && (
                    <div>
                        Clique no botão upload para adicionar fotos do produto
                    </div>
                )}
            </div>
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