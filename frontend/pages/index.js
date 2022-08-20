import Grid from "../components/Grid";
import Services from "../components/Services";

export default function Home({ banner }) {
  return (
    <div className="container mx-auto px-4 my-5">
      <img
        className="object-contain object-fill bg-gray-300 w-[100vw] h-[50vh]"
        src="https://images.freekaamaal.com/store_desc_images/1516103172.jpg"
        alt=""
      />
      <Grid myhtml={banner && banner} />
      <Services />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:1337/api/banners/1`);

  const data = await res.json();

  return {
    props: {
      banner: data,
    },
  };
}
