import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import Ticket from "./Ticket";
export default function Column({
  status,
  title,
  color,
  textColor,
  tickets,
  setTicket,
  getTickets,
  active,
  setActive,
}) {
  const { token } = useContext(AppContext);
  const handleDrop = async (e) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    const success = await updateTickets(id);
    if (success) {
      getTickets();
    }
  };
  async function updateTickets(id) {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to update ticket");
      return false;
    }
  }
  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={allowDrop}
        className={`w-72 h-[800px] ${color}  ${active ? "opacity-80" : ""}`}
      >
        <h1 className={`font-bold p-2 text-left title ${textColor}`}>
          {title}
        </h1>
        <div className="flex flex-col p-3 gap-2 text-black">
          {tickets
            .filter((ticket) => status == ticket.status)
            .map((ticket) => (
              <Ticket
                id={ticket.id}
                title={ticket.title}
                getTickets={getTickets}
                active={active}
                setActive={setActive}
                // details={ticket.details}
              />
            ))}
        </div>
      </div>
    </>
  );
}
