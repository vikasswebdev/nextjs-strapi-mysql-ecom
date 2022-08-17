import Grid from "../components/Grid";
import Services from "../components/Services";

export default function Home() {
  return (
    <div className="container mx-auto px-4 my-5">
      <img
        className="object-contain object-fill bg-gray-300 w-[100vw] h-[50vh]"
        src="https://www.mantrimart.com/wp-content/uploads/2018/09/grocerry2-1.png"
        alt=""
      />
      <Grid />
      <Services />
    </div>
  );
}
