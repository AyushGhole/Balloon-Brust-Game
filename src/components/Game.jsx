import { useState } from "react";
import Pump from "./Pump";
import Balloon from "./Balloon";

export default function Game() {
  const [balloons, setBalloons] = useState([]);
  const [isPumping, setIsPumping] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const startPump = () => {
    if (isPumping) return;

    const id = Date.now();
    setIsPumping(true);
    setActiveId(id);

    setBalloons((prev) => [
      ...prev,
      {
        id,
        released: false,
      },
    ]);
  };

  const stopPump = () => {
    setIsPumping(false);
    setActiveId(null);
  };

  const releaseBalloon = (id) => {
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, released: true } : b))
    );
  };

  const burstBalloon = (id) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Balloons */}
      {balloons.map((b) => (
        <Balloon
          key={b.id}
          isActive={b.id === activeId}
          released={b.released}
          onRelease={() => releaseBalloon(b.id)}
          onBurst={() => burstBalloon(b.id)}
        />
      ))}

      {/* Pump */}
      <Pump isPumping={isPumping} startPump={startPump} stopPump={stopPump} />
    </div>
  );
}
