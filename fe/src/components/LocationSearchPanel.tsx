import * as React from "react";
import { IoLocationOutline } from "react-icons/io5";
import {data} from "../../deadlock.js"


const LocationSearchPanel = ({ func1 , func2  }) => {
  return (
    <div className="w-full h-full bg-white flex flex-col px-2">
      <h1 className="text-2xl pl-10 font-medium mb-5">Choose your trip.</h1>

      <div className="w-full flex flex-col px-4 gap-6">
        {data.map((e, i) => (
          <div
            onClick={() => {func1(true) ,func2(false)}} // Calls the state function passed in props
            key={i}
            className="flex active:border-2 border-black rounded-xl items-center gap-5 cursor-pointer"
          >
            <div className="w-16 h-12 text-2xl flex items-center rounded-full justify-center bg-[#eee]">
              <IoLocationOutline />
            </div>
            <div className="w-full flex flex-col">
              <h1 className="text-[1.35rem] font-semibold">{e.name}</h1>
              <p className="w-[90%] leading-[1.3rem] text-gray-600 font-medium">
                {e.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
