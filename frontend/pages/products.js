import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const Products = (props) => {
  const { products } = props;
  const router = useRouter();

  const goToProduct = (slug) => {
    router.push(`/product/${slug}`);
  };

  return (
    <Layout>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                  Products list - MyShop
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                let's see what we have in stock today ...
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              {products.data.map((product) => (
                <div className="xl:w-1/4 md:w-1/2  p-4">
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <img
                      className="h-40 rounded w-full object-cover object-center mb-6"
                      src={product.attributes.image.data.attributes.name}
                      alt="content"
                    />
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {product.attributes.category}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {product.attributes.title}
                    </h2>
                    {/* <p className="leading-relaxed text-base">
                      {product.attributes.description}
                    </p> */}
                    <button
                      onClick={() => goToProduct(product.attributes.slug)}
                      className="flex items-center text-white justify-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-base mt-6"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:1337/api/products?populate=*`);

  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}

export default Products;
