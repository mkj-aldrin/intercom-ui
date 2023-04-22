import { COMModule } from "../custom-element/module";

export const easingMap = {
  quintOut: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
  quintIn: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
};

export const ani = (obj: { el: COMModule; box: DOMRect }) => {
  const oldBox = obj.box;
  const newBox = obj.el.getBoundingClientRect();

  const posDiff = {
    x: oldBox.x - newBox.x,
    y: oldBox.y - newBox.y,
  };

  const opt: KeyframeAnimationOptions = {
    easing: easingMap.quintOut,
    duration: 125,
    fill: "both",
    composite: "accumulate",
  };

  obj.el.animate(
    [
      {
        transform: `translate(${posDiff.x}px,${posDiff.y}px)`,
      },
      {},
    ],
    opt
  );
};

export function move([clientX, clientY], module: COMModule, reset = false) {
  const opt: KeyframeAnimationOptions = {
    easing: easingMap.quintOut,
    duration: 500,
    fill: "both",
  };

  const v = {
    x: Math.max(
      Math.min((clientX - module.data.animation.boxCenter.x) * 0.0625, 5),
      -5
    ),
    y: Math.max(
      Math.min((clientY - module.data.animation.boxCenter.y) * 0.0625, 5),
      -5
    ),
  };

  module.animate(
    [
      {
        transform: reset
          ? "translate(0px,0px)"
          : `translate(${v.x}px,${v.y}px)`,
      },
    ],
    opt
  );
}
