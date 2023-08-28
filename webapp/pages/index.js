import Header from '@/components/Header'
import Featured from '@/components/Featured'
import { Product } from '@/models/Product'
import { mongooseConnect } from "@/lib/mongoose"

export default function Home({ product }) {
  return (
    <>
      <Header />
      <Featured product={product}/>
    </>
  )
}

export async function getServerSideProps() {
  const featuredProduct = "64eb962fe919492e403677d2"
  await mongooseConnect();
  const product = await Product.findById(featuredProduct);
  return {
    props: { product: JSON.parse(JSON.stringify(product))}
  }
}
