import { styled } from "styled-components"
import Center from "./Center"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const Bg = styled.div`
    background-color: #FBFBFB;
    padding: 20px;
    h1 {
        width: 100%;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #f4f4f4;
        margin-bottom: 40px;
    }
`

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
`

const ProductCard = styled.div`
    padding: 0 20px;
    img {
        width: 100%;
        height: auto;
        border-radius: 25px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
    }
    h2 {
        font-size: 1.6rem;
        text-align: center;
    }
    p {
        font-size: 1rem;
    }
    span {
        font-size: 1.6rem;
        font-weight: bold;
    }
    div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
`

const Button = styled.button`
    font-size: 1rem;
    font-weight: bold;
    padding: 15px;
    background-color: transparent;
    border: 2px solid #000;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    border-radius: 4px;
    svg {
        height: 24px;
    }
`

export default function NewProducts({ products }) {
    const {addProduct} = useContext(CartContext);
    
    return (
        <Bg>
            <Center>
                <h1>Produtos Novos</h1>
                <ProductsGrid>
                    {products?.length > 0 && products.map(product => (
                        <ProductCard key={product._id}>
                            <img
                                src={product.images[0]}
                                alt={`Imagem do ${product.name}`}
                            />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <div>
                                <span>$ {product.price}</span>
                                <Button onClick={() => addProduct(product._id)}>
                                    Adicione ao Carrinho
                                </Button>
                            </div>
                        </ProductCard>
                    ))}
                </ProductsGrid>
            </Center>
        </Bg>
    )
}