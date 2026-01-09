import { useState } from "react";
import "./App.css";
import Game from "./components/Game";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

export default function App() {
  return (
    <>
      <div className="main w-screen h-screen overflow-hidden relative">
        {/* Back Button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 26,
            left: 26,
            zIndex: 2000,
            backgroundColor: "white",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}>
          <WestOutlinedIcon />
        </IconButton>

        {/* Game */}
        <Game />
      </div>
    </>
  );
}
