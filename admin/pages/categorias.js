import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import axios from "axios";

function Categories({ swal }) {
    const [name, setName] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, [])

    function fetchCategories() {
        axios.get("/api/categories").then(result => {
            setCategories(result.data);
        })
    }

    async function saveCategory(e) {
        e.preventDefault();
        const data = { name };
        
        if (subCategory) {
            data.subCategory = subCategory;
        }
    
        if (editedCategory) {
            data._id = editedCategory._id;
            await axios.put("/api/categories", data);
            setEditedCategory(null);
        } else {
            await axios.post("/api/categories", data);
        }
        setName("");
        setSubCategory("");
        fetchCategories();
    }
    

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setSubCategory(category.parent?._id);
    }
    function deleteCategory(category) {
        swal.fire({
            title: "Têm Certeza?!",
            text: `Você deseja deletar ${category.name}`,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, Deletar!",
            confirmButtonColor: "#d55"
        }).then(async result => {
            if (result.isConfirmed) {
                const {_id} = category;
                await axios.delete("/api/categories?_id="+_id);
                fetchCategories();
            }
        }).catch(err => {
            
        });
    }

    return (
        <Layout>
            <h1>Categorias</h1>
            <label className="py-2 font-semibold inline-block">
                {editedCategory
                    ? `Editar Categoria ${editedCategory.name}`
                    : 'Adicione um nome para Categoria:'
                }
            </label>
            <form onSubmit={saveCategory} className="flex gap-1">
                <input
                    className="mb-0"
                    type="text"
                    placeholder="Nome da Categoria"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <select
                    className="mb-0"
                    value={subCategory}
                    onChange={e => setSubCategory(e.target.value)}
                >
                    <option value="">Selecione Subcategoria</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                <button className="btn-primary py-1" type="submit">Salvar</button>
            </form>
            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td>Nome da Categoria</td>
                        <td>Subcategoria</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button
                                    className="btn-primary mr-1"
                                    onClick={() => editCategory(category)}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteCategory(category)}
                                    className="btn-primary">
                                    Deletar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Layout>
    );
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
))