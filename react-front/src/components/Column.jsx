export default function Column({ status, title, color, textColor }) {
  return (
    <>
      <div className={`w-48 h-[1000px] ${color}`}>
        <h1 className={`font-bold p-2 text-left title ${textColor}`}>
          {" "}
          {title}
        </h1>
      </div>
    </>
  );
}
