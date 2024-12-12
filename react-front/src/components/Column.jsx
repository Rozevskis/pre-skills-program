import Ticekt from "./Ticket";
export default function Column({
  status,
  title,
  color,
  textColor,
  tickets,
  setTicekts,
  getTicekts,
}) {
  return (
    <>
      <div className={`w-72 h-[800px] ${color}`}>
        <h1 className={`font-bold p-2 text-left title ${textColor}`}>
          {title}
        </h1>
        <div className="flex flex-col p-3 gap-2 text-black">
          {tickets
            .filter((ticket) => status == ticket.status)
            .map((ticket) => (
              <Ticekt
                id={ticket.id}
                title={ticket.title}
                // details={ticket.details}
              />
            ))}
        </div>
      </div>
    </>
  );
}
