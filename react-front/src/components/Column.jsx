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
  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.getData("text/plain"));
    console.log(status);
  };
  return (
    <>
      <div
        onDrop={() => {
          handleDrop();
        }}
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
