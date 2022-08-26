import Grid from "../components/Grid";
import Services from "../components/Services";
import SlideBanner from "../components/atom/SlideBanner";

export default function Home({ banner }) {
  return (
    <div className="mx-auto">
      <SlideBanner />
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
