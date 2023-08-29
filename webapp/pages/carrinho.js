import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    padding: 100px 0 100px 0;
`

const Box = styled.div`
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`

const ButtonPayment = styled.button`
    width: 100%;    
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 15px;
    background-color: #212529;
    color: #FBFBFB;
    cursor: pointer;
    font-weight: bold;
`

const Button = styled.button`
    font-size: 1.2rem;
    font-weight: bold;
    padding: 10px 15px;
    background-color: #dfdfdf;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

const Input = styled.input`
    outline: none;
    border: 1px solid #c1c1c1;
    padding: 15px;
    margin-bottom: 20px;
`

const Table = styled.table`
    border-collapse: collapse;
    thead {
        text-align: left;
        th {
            background-color: #f8f8f8;
            font-size: 1.2rem;
            padding: 5px;
        }
    }
    tbody {
        td {
            padding: 10px;
            span {
                font-size: 1.4rem;
                font-weight: bold;
            }
        }
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const ProductImage = styled.div`
    td {
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        p {
            font-size: 1.2rem;
            margin-left: 10px;
            font-weight: bold;
        }
    }
 
`

const ImageBox = styled.div`
    width: 200px;
    height: auto;
    border: 1px solid #aaa;
    border-radius: 5px;
    img {
        width: 100%;
        height: auto;
    }   
`
const Quantity = styled.div`
  display: inline-block;
  padding: 5px;
  border: 1px solid #c1c1c1;
  font-size: 1.2rem;
  font-weight: bold;
`

const FooterCart = styled.tr`
    td { 
        background-color: #f8f8f8;
    }
`

export default function CartPage() {
    const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts }).then(response => {
                setProducts(response.data)
            })
        }
    }, [cartProducts])

    function moreThisProduct(id) {
        addProduct(id);
    }

    function lessThisProduct(id) {
        removeProduct(id);
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(product => product._id === productId)?.price || 0;
        total += price;
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h1>Carrinho</h1>
                        {!cartProducts?.length && (
                            <div>Seu Carrinho Está vazio</div>
                        )}
                        {products?.length > 0 && (
                            <>
                                <Table>
                                    <thead>
                                        <th>Produto</th>
                                        <th>Quantidade</th>
                                        <th>Preço</th>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                            <tr>
                                                <ProductImage>
                                                    <td>
                                                        <ImageBox>

                                                            <img src={product.images[0]} />
                                                        </ImageBox>
                                                        <p>
                                                            {product.name}
                                                        </p>
                                                    </td>
                                                </ProductImage>
                                                <td>
                                                    <Button onClick={() => lessThisProduct(product._id)}>-</Button>
                                                    <Quantity>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </Quantity>
                                                    <Button onClick={() => moreThisProduct(product._id)}>+</Button>
                                                </td>
                                                <td>
                                                    <span>
                                                        R$ {cartProducts.filter(id => id === product._id).length * product.price}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        <FooterCart>
                                            <td>
                                                <span>
                                                    Total
                                                </span>
                                            </td>
                                            <td></td>
                                            <td>
                                                <span>
                                                    R$ {total}
                                                </span>
                                            </td>
                                        </FooterCart>
                                    </tbody>
                                </Table>
                            </>
                        )}
                    </Box>
                    {cartProducts?.length > 0 && (
                        <Box>
                            <h2>Informações do Pedido</h2>
                            <Form method="POST" action="/api/checkout">
                                <label>Nome:</label>
                                <Input
                                    type="text"
                                    placeholder="Jhon Mackley"
                                    value={name}
                                    name="name"
                                    onChange={e => setName(e.target.value)}
                                />
                                <label>Email:</label>
                                <Input
                                    type="email"
                                    placeholder="jhon.mackley@gmail.com"
                                    value={email}
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label>CEP:</label>
                                <Input
                                    type="text"
                                    placeholder="Ex: 12500000"
                                    value={cep}
                                    name="cep"
                                    onChange={e => setCep(e.target.value)}
                                />
                                <label>Cidade:</label>
                                <Input
                                    type="text"
                                    placeholder="Ex: Racon"
                                    value={city}
                                    name="city"
                                    onChange={e => setCity(e.target.value)}
                                />
                                <label>Rua:</label>
                                <Input
                                    type="text"
                                    placeholder="Ex: Rua, aproved, nº1"
                                    value={street}
                                    name="street"
                                    onChange={e => setStreet(e.target.value)}
                                />
                                <label>Telefone:</label>
                                <Input
                                    type="text"
                                    placeholder="(xx)XXXXX-XXXX"
                                    value={phone}
                                    name="phone"
                                    onChange={e => setPhone(e.target.value)}
                                />
                                <input type="hidden" name="products" value={cartProducts.join(',')}/>
                                <ButtonPayment type="submit">
                                    Finalizar Compra
                                </ButtonPayment>
                            </Form>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    );
}