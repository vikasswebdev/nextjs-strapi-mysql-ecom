import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Products = (props) => {
  const { products, cart } = props;
  const router = useRouter();

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {products.data.map((product) => (
            <div className="p-4 md:w-1/3" key={product.attributes.slug}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={product.attributes.image.data.attributes.name}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {product.attributes.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {product.attributes.title}
                  </h1>
                  <div className="flex items-center flex-wrap ">
                    <Link href={`/product/${product.attributes.slug}`}>
                      <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        Buy Now
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
