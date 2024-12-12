import Ticket from "../components/Ticket";
import Column from "../components/Column";
import { useEffect, useState } from "react";
export default function Home() {
  const [ticekts, setTicekts] = useState([]);
  useEffect(() => {
    getTicekts();
  }, []);

  async function getTicekts() {
    const res = await fetch("/api/tickets", {
      method: "get",
    });
    const data = await res.json();
    if (res.ok) {
      setTicekts(data);
    }
    console.log(data);
  }
  return (
    <>
      <h1 className="title">Home</h1>
      <div className="flex flex-row gap-6 p-3 ">
        <Column
          title="New"
          status="new"
          color={"bg-sky-200"}
          textColor={"text-sky-600"}
        />
        <Column
          title="Approved"
          status="approved"
          color={"bg-yellow-200"}
          textColor={"text-yellow-600"}
        />
        <Column
          title="Done"
          status="done"
          color={"bg-lime-200"}
          textColor={"text-lime-600"}
        />
      </div>
    </>
  );
}
