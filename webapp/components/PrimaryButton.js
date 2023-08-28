import { styled } from "styled-components"

const StyledButton = styled.button`
    border: 0;
    padding: 15px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    background-color: #5542f6;
    border: 1px solid #5542f6;
    color: #FBFBFB;
    font-size: 1.2rem;
    svg {
        height: 26px;
        margin-right: 5px;
    }
    `

export default function PrimaryButton({ children}) {
    return (
        <StyledButton>
            {children}
        </StyledButton>
    )
}