import { CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #c1c1c1;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  )
}
