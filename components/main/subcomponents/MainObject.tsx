"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const MainObject = () => {
  const blurTitleRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const movePointer = (e: MouseEvent) => {
      if (blurTitleRef.current && pointerRef.current) {
        const pointerWidth = pointerRef.current.offsetWidth;
        const pointerHeight = pointerRef.current.offsetHeight;

        const mouseX =
          e.clientX - blurTitleRef.current.offsetLeft - pointerWidth / 1.5;
        const mouseY =
          e.clientY - blurTitleRef.current.offsetTop - pointerHeight * 1.2;

        // gsap으로 부드럽게 이동
        gsap.to(pointerRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.6,
          delay: 0.1,
          ease: "power3.out",
        });
      }
    };

    document.addEventListener("mousemove", movePointer);
    return () => document.removeEventListener("mousemove", movePointer);
  }, []);
  return (
    <div className="title" ref={blurTitleRef}>
      <div className="blurText">
        <div className="blurBG"></div>
        <div className="pointer" ref={pointerRef} />
      </div>
    </div>
  );
};
export default MainObject;
