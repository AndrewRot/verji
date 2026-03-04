import { client } from '@/lib/sanity';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Shop from '@/components/Shop';

async function getProducts() {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Hero products={products} />
      <About />
      <Shop products={products} />
    </main>
  );
}
