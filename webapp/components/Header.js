import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";

const StyledHeader = styled.header`
    background-color: #212529;
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
                        <NavLink href={"/carrinho"}>Carrinho (0)</NavLink>
                    </Navbar>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}