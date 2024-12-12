export default function Ticekt({ id, title, details }) {
  return (
    <>
      <div className="p-3 gap-2 bg-neutral-100 rounded-xl text-left flex flex-col">
        <p>{id}</p>
        <p>{title}</p>
        {/* <p>{details}</p> */}
      </div>
    </>
  );
}
