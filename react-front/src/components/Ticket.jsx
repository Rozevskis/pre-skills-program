import { useState } from "react";

export default function Ticekt({ id, title, details }) {
  const [options, setOptions] = useState(false);

  function handleOptions() {
    if (!options) {
      setOptions(true);
    } else {
      setOptions(false);
    }
  }
  return (
    <>
      <div className="p-3 gap-2 bg-neutral-100 rounded-xl text-left flex flex-col shadow-md">
        <div className="flex justify-between">
          {id}{" "}
          <a onClick={() => handleOptions()} className=" cursor-pointer">
            ...
          </a>
          <div
            className={`
                ${!options ? "hidden" : ""}
                mt-[30px] 
            ml-[180px] absolute p-3 gap-2 bg-slate-200 rounded-xl text-left flex flex-col shadow-md `}
          >
            <a>Delete</a>
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
