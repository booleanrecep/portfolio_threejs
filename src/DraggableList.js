// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

import React, { useRef } from "react";
import clamp from "lodash-es/clamp";
import swap from "lodash-move";
import { useDrag } from "react-use-gesture";
import { useSprings, animated } from "react-spring";
import "./styles.css";
const myLinks = [
  "https://angel.co/u/recep-ozturk",
  "https://linkedin.com/in/booleanrecep/",
  "https://github.com/booleanrecep"
];
// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? {
        y: curIndex * 80 + y,
        scale: 1.1,
        zIndex: "1",
        shadow: 15,
        immediate: n => n === "y" || n === "zIndex"
      }
    : {
        y: order.indexOf(index) * 80,
        scale: 1,
        zIndex: "0",
        shadow: 1,
        immediate: false
      };

export default function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 20 + y) / 100),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder;
  });
  return (
    <div className="content" style={{ height: items.length * 50 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale
          }}
          children={
            <a href={`${myLinks[i]}`} target={"_blank"}>
              {`${items[i]}`}
            </a>
          }
        />
      ))}
    </div>
  );
}
