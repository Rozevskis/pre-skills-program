import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

export default function Ticekt({
  id,
  title,
  details,
  getTickets,
  active,
  setActive,
}) {
  const [options, setOptions] = useState(false);
  const { token } = useContext(AppContext);

  function handleOptions() {
    if (!options) {
      setOptions(true);
    } else {
      setOptions(false);
    }
  }
  const handleDragStart = (e, id) => {

    // setActive(true);
    e.dataTransfer.setData("text/plain", id);
  };
  async function handleDelete(id) {
    const res = await fetch(`/api/tickets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      setOptions(false);
      getTickets();
    }
  }
  return (
    <>
      <div
        draggable="True"
        onDragStart={(e) => handleDragStart(e, id)}
        // onDragEnd={setActive(false)}
        className="cursor-pointer active:cursor-grab p-3 gap-2 bg-neutral-100 rounded-xl text-left flex flex-col shadow-md"
      >
        <div className="flex justify-between">
          {id}
          <a onClick={() => handleOptions(id)} className=" cursor-pointer">
            ...
          </a>
          <div
            className={`
                ${!options ? "hidden" : ""}
                mt-[30px] 
            ml-[180px] absolute p-3 gap-2 bg-slate-200 rounded-xl text-left flex flex-col shadow-md `}
          >
            <a onClick={() => handleDelete(id)}>Delete</a>
            <a>Edit</a>
            {/* <a >History</a> */}
          </div>
        </div>
        <p>{title}</p>
        {/* <p>{details}</p> */}
      </div>
    </>
  );
}
