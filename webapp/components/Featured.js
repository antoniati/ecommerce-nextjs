import { styled } from "styled-components";
import Center from "./Center";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";

const Bg = styled.div`
    background-color: #212529;
    color: #FBFBFB;
    padding: 50px 0;
`

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`

const Description = styled.p`
    color: #aaa;
    line-height: 35px;
    font-size: 1.4rem;
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr .7fr;
    gap: 40px;
    img {
        max-width: 100%;
    }
`

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
`

const ButtonLink = styled(Link)`
    background-color: transparent;
    padding: 15px;
    color: #FFF;
    text-decoration: none;
    border: 1px solid #FFF;
    border-radius: 5px;
    font-size: 1.2rem;
`

export default function Featured({product}) {
    return (
        <Bg>
            <Center>
                <Wrapper>
                    <div>
                        <Title>{product.name}</Title>
                        <Description>{product.description}</Description>
                        <ButtonsWrapper>
                            <ButtonLink href={"/produtos/"+product._id}>Saiba Mais</ButtonLink>
                            <PrimaryButton>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                Adicione ao Carrinho
                            </PrimaryButton>
                        </ButtonsWrapper>
                    </div>
                    <div>
                        <img src="https://antoniati-ecommerce-nextjs.s3.sa-east-1.amazonaws.com/1693257782460.png" />
                    </div>
                </Wrapper>
            </Center>
        </Bg>
    );
}