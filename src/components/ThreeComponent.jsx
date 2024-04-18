import React from "react";
import Grafics from "../grafics";
import { useEffect, useState } from "react";

function ThreeComponent() {
  const [grafics, setGrafics] = useState(0);

  const loop = () => {
    Grafics.render(grafics);

    window.requestAnimationFrame(() => loop());
  }

  useEffect(() => {
    setGrafics(Grafics.crearBasic(document.getElementById("canvas"), "#111111"));
    
    window.addEventListener("resize", () => {
      Grafics.reSize(grafics, window.innerWidth, window.innerHeight);
    });
  }, []);

  return (
    <div>
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default ThreeComponent;
