import pumpBody from "../assets/Symbol 320003.png";
import pumpHandle from "../assets/Symbol 320001.png";
import nozzle from "../assets/Symbol 320002.png";

export default function Pump({ isPumping, startPump, stopPump }) {
  return (
    <div className="absolute  center bottom-12 right-16 select-none">
      <div className="relative w-32 mx-auto">
        {/* Handle */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-20 h-24 overflow-hidden z-0">
          <img
            src={pumpHandle}
            className={`w-40 cursor-pointer transition-transform duration-150
              hover:scale-105
              ${isPumping ? "translate-y-6" : ""}
            `}
            onMouseDown={startPump}
            onMouseUp={stopPump}
            onMouseLeave={stopPump}
            onTouchStart={startPump}
            onTouchEnd={stopPump}
            draggable={false}
          />
        </div>
        {/* Pump body */}
        {/* <img
          src={pumpBody}
          className="w-42 relative z-10 pointer-events-none drop-shadow-lg"
          draggable={false}
        /> */}
        <div className="relative inline-block">
          {/* Pump body */}
          <img
            src={pumpBody}
            alt="Pump"
            className="block w-62 relative z-10 pointer-events-none drop-shadow-lg"
            draggable={false}
          />

          {/* Nozzle */}
          <img
            src={nozzle}
            alt="Nozzle"
            className="absolute -left-[70px] top-1/4 -translate-y-1/2 z-20 pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
