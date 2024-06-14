import { getSession } from "@/action";
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
