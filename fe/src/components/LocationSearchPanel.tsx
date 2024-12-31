import * as React from "react";
import { IoLocationOutline } from "react-icons/io5";

interface ValProps {
  func1: (value: boolean) => void;
  func2: (value: boolean) => void;
  finalPickup: (val: string) => void;
  finalDestination: (val: string) => void;
  pickUPsuggestion: string[] | null;
  destinationsuggestion: string[] | null;
}

const LocationSearchPanel: React.FC<ValProps> = ({
  func1,
  func2,
  finalPickup,
  pickUPsuggestion,
  finalDestination,
  destinationsuggestion,
}) => {
  return (
    <div className="w-full h-full bg-white flex flex-col px-2">
      <h1 className="text-2xl pl-10 font-medium mb-5">Choose your trip.</h1>

      <div className="w-full flex flex-col px-4 gap-4">
        {destinationsuggestion && destinationsuggestion.length > 0 ? (
          destinationsuggestion.map((e, i) => (
            <div
              onClick={() => {
                finalDestination(e);
              }}
              key={i}
              className="flex active:border-2 border-black rounded-xl items-center gap-5 cursor-pointer p-4 hover:bg-gray-100 transition"
            >
              <div className="w-16 h-12 text-2xl flex items-center rounded-full justify-center bg-[#eee]">
                <IoLocationOutline />
              </div>
              <div className="w-full flex flex-col">
                <h1 className="text-[1.15rem] font-semibold">{e}</h1>
              </div>
            </div>
          ))
        ) : pickUPsuggestion && pickUPsuggestion.length > 0 ? (
          pickUPsuggestion.map((e, i) => (
            <div
              onClick={() => {
                finalPickup(e);
              }}
              key={i}
              className="flex active:border-2 border-black rounded-xl items-center gap-5 cursor-pointer p-4 hover:bg-gray-100 transition"
            >
              <div className="w-16 h-12 text-2xl flex items-center rounded-full justify-center bg-[#eee]">
                <IoLocationOutline />
              </div>
              <div className="w-full flex flex-col">
                <h1 className="text-[1.15rem] font-semibold">{e}</h1>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
