import { styled } from "styled-components"
import Center from "./Center"

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
    gap: 5px;
    border-radius: 4px;
    svg {
        height: 24px;
    }
`

export default function NewProducts({ products }) {
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
                                <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
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