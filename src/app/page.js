import { getSession } from "@/action";
import Footer from "@/components/AppComponents/Footer";
import Main from "@/components/AppComponents/Main";
export default async  function Home () {
  const session = await  getSession();
  console.log(session);
  return (
    <div className="">
      <Main />
     
    </div>
  );
}
