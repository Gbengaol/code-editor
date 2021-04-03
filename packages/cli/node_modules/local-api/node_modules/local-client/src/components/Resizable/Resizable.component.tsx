import React, { Fragment, useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.scss";

interface ResizableProps {
  direction: "horizontal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 200);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width,
      axis: "x",
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.35, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      axis: "y",
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.95],
      minConstraints: [Infinity, innerHeight * 0.35],
    };
  }
  return (
    <ResizableBox {...resizableProps}>
      <Fragment>{children}</Fragment>
    </ResizableBox>
  );
};

export default Resizable;
