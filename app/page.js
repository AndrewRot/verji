import { client } from '@/lib/sanity';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import Media from '@/components/Media';
import Shop from '@/components/Shop';

async function getProducts() {
  const query = `*[_type == "product"] | order(name asc)`;
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
      <Media />
      <Footer />
    </main>
  );
}
