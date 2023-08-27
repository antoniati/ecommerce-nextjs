import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function ProductForm({
    _id,
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties
}) {
    const [name, setName] = useState(existingName || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [category, setCategory] = useState(assignedCategory || "")
    const [productProperties, setProductProperties] = useState(assignedProperties || {})
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const [categories, setCategories] = useState([]);

    const router = useRouter();

    useEffect(() => {
        axios.get("/api/categories").then(result => {
            setCategories(result.data);
        })
    }, []);

    async function saveProduct(e) {
        e.preventDefault();

        const data = { name, description, price, images, category, properties: productProperties }

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

    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let selectedCategoryInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...selectedCategoryInfo.properties)
        while (selectedCategoryInfo?.parent?._id) {
            const parentCategory = categories.find(({ _id }) => _id === selectedCategoryInfo?.parent?._id)
            propertiesToFill.push(...parentCategory.properties);
            selectedCategoryInfo = parentCategory;
        }
    }

    function changeProductProperties(propertyName, value) {
        setProductProperties(prev => {
            const newProductProperties = {...prev};
            newProductProperties[propertyName] = value;
            return newProductProperties;
        })
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
            <label>Categoria</label>
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
            >
                <option value="">Selecione uma Categoria</option>
                {categories.length > 0 && categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>
            {propertiesToFill.length > 0 && propertiesToFill.map(property => (
                <div className="flex gap-1">
                    <h3> {property.name} </h3>
                    <select
                        value={productProperties[property.name]}
                        onChange={(e) => changeProductProperties(property.name, e.target.value)}
                    >
                        {property.values.map(value => (
                            <option value={value}>{value}</option>
                        ))}
                    </select>
                </div>
            ))}
            <label>Fotos</label>
            <div className="mb-2 flex flex-wrap gap-2">
                {!!images?.length && images.map(link => (
                    <div key={link} className="h-24">
                        <img src={link} alt="Imagem do produto" className="rounded-md" />
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