import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
    width: 100%;
    background-color: #212529;
    position: fixed;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
`

const Logo = styled(Link)`
    color: #FBFBFB;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2px; 
`
const NavLink = styled(Link)`
    color: #aaa;
    text-decoration: none;
`

const Navbar = styled.nav`
    display: flex;
    gap: 20px;
    font-size: 18px;
    letter-spacing: 1px;
`

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={"/"}>
                        Ecommerce
                    </Logo>
                    <Navbar>
                        <NavLink href={"/"}>Inicio</NavLink>
                        <NavLink href={"/produtos"}>Produtos</NavLink>
                        <NavLink href={"/categorias"}>Categorias</NavLink>
                        <NavLink href={"/conta"}>Conta</NavLink>
                        <NavLink href={"/carrinho"}>Carrinho ({cartProducts.length})</NavLink>
                    </Navbar>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}