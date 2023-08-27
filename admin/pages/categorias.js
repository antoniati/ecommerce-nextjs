import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
import Layout from "@/components/Layout";
import axios from "axios";

function Categories({ swal }) {
    const [name, setName] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [editedCategory, setEditedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);

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
        const data = { 
            name,
            properties: properties.map((property) => ({
                name: property.name,
                values: property.values.split(',')
            }))
        };

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
        setProperties([]);
        fetchCategories();
    }


    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setSubCategory(category.parent?._id);
        setProperties(category.properties.map(({name, values}) => ({
            name,
            values: values.join(',')
        })));
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
                const { _id } = category;
                await axios.delete("/api/categories?_id=" + _id);
                fetchCategories();
            }
        });
    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }];
        })
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        })
    }

    function removeProperty(indexToRemove) {
        setProperties(prev => {
            return [...prev].filter((property, propertyIndex) => {
                return propertyIndex !== indexToRemove
            })
        })
    }

    return (
        <Layout>
            <h1>Categorias</h1>
            <label>
                {editedCategory
                    ? `Editar Categoria ${editedCategory.name}`
                    : 'Adicione um nome para Categoria:'
                }
            </label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
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
                </div>
                <div>
                    <label className="block">Propriedades</label>
                    <button
                        onClick={addProperty}
                        type="button"
                        className="btn-default text-base mb-2"
                    >
                        Adicione propriedades
                    </button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-1 mb-2" key={index}>
                            <input
                                className="mb-0"
                                type="text"
                                value={property.name}
                                onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                                placeholder="Nome da propriedade (ex: cor)"
                            />
                            <input
                                className="mb-0"
                                type="text"
                                value={property.values}
                                onChange={e => handlePropertyValuesChange(index, property, e.target.value)}
                                placeholder="Valores separados por vírgula"
                            />
                            <button type="button" className="btn-default" onClick={() => removeProperty(index)}>
                                Remover
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button 
                            type="button"
                            className="btn-default"
                            onClick={() => {
                                setEditedCategory(null)
                                setName("");
                                setSubCategory("");
                                setProperties([]);
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        className="btn-primary py-1"
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </form>
            {!editedCategory && (
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
            )}
        </Layout>
    );
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
))