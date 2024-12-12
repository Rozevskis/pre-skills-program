import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Ticket from "../components/Ticket";
import Column from "../components/Column";
import { act, useEffect, useState } from "react";
export default function Home() {
  const { token } = useContext(AppContext);
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(false);
  const [create, setCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });
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

  function handleCreate() {
    if (!create) {
      setCreate(true);
    } else {
      setCreate(false);
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    console.log(e.dataTransfer.getData("text/plain"));
  }

  async function createTicket(e) {
    e.preventDefault();
    console.log(formData);
    const res = await fetch("/api/tickets", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      setCreate(false);
      getTickets();
    }
  }
  return (
    <>
      <a className="bg-slate-500 p-2 rounded" onClick={() => handleCreate()}>
        Add Ticekt
      </a>
      <div
        className={`  ${
          !create ? "hidden" : ""
        } absolute p-4 rounded bg-slate-400 left-[50%]`}
      >
        <form className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center">
            <label>Title</label>
            <input
              className=" bg-slate-200 text-black px-2 py-1 rounded-sm"
              type="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <label>Details</label>
            <textarea
              className=" bg-slate-200 text-black px-2 py-1 rounded-sm"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
            <a
              className="bg-slate-100 text-black p-2 rounded"
              type="submit"
              onClick={createTicket}
            >
              Submit
            </a>
          </div>
        </form>
      </div>
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
          onDrop={() => {
            handleDrop();
          }}
          onDragEnter={handleDrop}
          className="bg-red-400 w-[300px] h-[300px]"
        >
          Drop
        </div>
      </div>
    </>
  );
}
