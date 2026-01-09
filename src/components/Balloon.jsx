import { useEffect, useRef, useState } from "react";
import balloonOrange from "../assets/Symbol 100006.png";
import balloonBlue from "../assets/Symbol 100008.png";
import balloonPink from "../assets/Symbol 100007.png";
import balloonRed from "../assets/Symbol 100005.png";
import balloonYellow from "../assets/Symbol 100003.png";
import burstSound from "../assets/burst.mp3";

export default function Balloon({ isActive, released, onRelease, onBurst }) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const audioRef = useRef(new Audio(burstSound));

  const [size, setSize] = useState(0.2);
  const [bursting, setBursting] = useState(false);

  // Random Balloon selection
  const balloonImages = [
    balloonOrange,
    balloonBlue,
    balloonPink,
    balloonRed,
    balloonYellow,
  ];

  // Pick ONCE per balloon
  const balloonSrc = useRef(
    balloonImages[Math.floor(Math.random() * balloonImages.length)]
  );

  /* -------- Random firecracker directions -------- */
  const sparks = useRef(
    Array.from({ length: 24 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      return {
        angle,
        speed: 4 + Math.random() * 3,
        gravity: 0.12 + Math.random() * 0.08,
      };
    })
  );

  const angle =
    [150, 160, 135][Math.floor(Math.random() * 3)] * (Math.PI / 180);

  const speed = 2.6;

  const pos = useRef({
    x: window.innerWidth - 290,
    y: window.innerHeight - 295,
    dx: Math.cos(angle) * speed,
    dy: -Math.sin(angle) * speed,
  });

  /* -------- Inflate -------- */
  useEffect(() => {
    if (!isActive || released) return;

    const id = setInterval(() => {
      setSize((s) => {
        if (s >= 1) {
          onRelease();
          return s;
        }
        return s + 0.02;
      });
    }, 30);

    return () => clearInterval(id);
  }, [isActive, released]);

  /* -------- Update transform -------- */
  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.transform = `
      translate(${pos.current.x}px, ${pos.current.y}px)
      scale(${size})
    `;
  }, [size]);

  /* -------- Floating -------- */
  useEffect(() => {
    if (!released || bursting) return;

    const animate = () => {
      pos.current.x += pos.current.dx;
      pos.current.y += pos.current.dy;

      if (ref.current) {
        ref.current.style.transform = `
          translate(${pos.current.x}px, ${pos.current.y}px)
          scale(${size})
        `;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [released, size, bursting]);

  // Preloading the audio
  useEffect(() => {
    const audio = new Audio("src/assets/burst.mp3");
    audio.preload = "auto";
    audio.load();
    audioRef.current = audio;
  }, []);

  /* -------- FIRECRACKER BURST -------- */
  // const handleBurst = () => {
  //   if (bursting) return;
  //   setBursting(true);

  //   cancelAnimationFrame(frameRef.current);

  //   // Sound
  //   audioRef.current.currentTime = 0;
  //   audioRef.current.play();

  //   // Balloon snap
  //   if (ref.current) {
  //     ref.current.style.transition = "transform 80ms ease, opacity 80ms ease";
  //     ref.current.style.transform += " scale(1.6)";
  //     ref.current.style.opacity = "0";
  //   }

  //   setTimeout(onBurst, 300);
  // };

  const handleBurst = () => {
    if (bursting) return;
    setBursting(true);

    cancelAnimationFrame(frameRef.current);

    /* ---------- INSTANT SOUND (NO DELAY) ---------- */
    const sound = audioRef.current.cloneNode();
    sound.currentTime = 0;
    sound.volume = 1;
    sound.play().catch(() => {});

    /* ---------- BALLOON POP (SMALL & SNAPPY) ---------- */
    if (ref.current) {
      ref.current.style.transition =
        "transform 90ms ease-out, opacity 90ms ease-out";
      ref.current.style.transform += " scale(1.3)"; // 🔽 smaller pop
      ref.current.style.opacity = "0";
    }

    /* ---------- REMOVE BALLOON ---------- */
    setTimeout(onBurst, 120);
  };

  return (
    <>
      {/* Balloon */}
      <img
        ref={ref}
        src={balloonSrc.current}
        onClick={handleBurst}
        className="absolute w-30 cursor-pointer origin-bottom pointer-events-auto"
        draggable={false}
      />

      {/* FIRECRACKER SPARKS */}
      {bursting &&
        sparks.current.map((s, i) => (
          <span
            key={i}
            className="fire-spark"
            style={{
              left: pos.current.x + 40,
              top: pos.current.y + 40,
              "--angle": s.angle,
              "--speed": s.speed,
              "--gravity": s.gravity,
            }}
          />
        ))}
    </>
  );
}
