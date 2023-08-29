import Header from '@/components/Header'
import Featured from '@/components/Featured'
import NewProducts from '@/components/NewProducts'
import { Product } from '@/models/Product'
import { mongooseConnect } from "@/lib/mongoose"

export default function Home({ product, products }) {
  return (
    <>
      <Header />
      <Featured product={product}/>
      <NewProducts products={products}/>
    </>
  )
}

export async function getServerSideProps() {
  const featuredProduct = "64eb962fe919492e403677d2"
  await mongooseConnect();
  const product = await Product.findById(featuredProduct);
  const products = await Product.find({}, null, {sort: {'_id':-1}, limit: 10});
  return {
    props: { 
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
