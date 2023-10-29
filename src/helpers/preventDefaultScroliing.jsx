import React, { useEffect } from "react";

const PreventNumberInputScrolling = () => {
  useEffect(() => {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    const preventScrolling = (e) => {
      e.preventDefault();
    };

    numberInputs.forEach((input) => {
      input.addEventListener("wheel", preventScrolling);
      input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
        }
      });
    });

    return () => {
      // Clean up event listeners when the component unmounts
      numberInputs.forEach((input) => {
        input.removeEventListener("wheel", preventScrolling);
        input.removeEventListener("keydown", preventScrolling);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PreventNumberInputScrolling;
