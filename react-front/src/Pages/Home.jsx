import Ticket from "../components/Ticket";
import Column from "../components/Column";
import { act, useEffect, useState } from "react";
export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    getTickets();
  }, []);

  async function getTickets() {
    const res = await fetch("/api/tickets", {
      method: "get",
    });
    const data = await res.json();
    if (res.ok) {
      setTickets(data);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    console.log(e.dataTransfer.getData("text/plain"));
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
          tickets={tickets}
          setTickets={setTickets}
          getTickets={getTickets}
          active={active}
          setActive={setActive}
        />
        <Column
          title="Approved"
          status="approved"
          color={"bg-yellow-200"}
          textColor={"text-yellow-600"}
          tickets={tickets}
          setTickets={setTickets}
          getTickets={getTickets}
          active={active}
          setActive={setActive}
        />
        <Column
          title="Done"
          status="done"
          color={"bg-lime-200"}
          textColor={"text-lime-600"}
          tickets={tickets}
          setTickets={setTickets}
          getTickets={getTickets}
          active={active}
          setActive={setActive}
        />
        <div
          onDrop={handleDrop}
          onDragEnter={handleDrop}
          className="bg-red-400 w-[300px] h-[300px]"
        >
          Drop
        </div>
      </div>
    </>
  );
}
