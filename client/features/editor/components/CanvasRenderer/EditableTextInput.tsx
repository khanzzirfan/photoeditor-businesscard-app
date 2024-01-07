import React from "react";
// @ts-ignore
import { Html } from "react-konva-utils";

// @ts-ignore
function getStyle(width: number, height: number): React.CSSProperties {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "none",
    padding: "0px",
    margin: "0px",
    background: "none",
    outline: "none",
    resize: "none" as any,
    colour: "black",
    fontSize: "24px",
    fontFamily: "sans-serif",
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const EditableTextInput = React.forwardRef((props: Props, ref: any) => {
  const { x, y, width, height, value, onChange, onKeyDown } = props;
  const style = getStyle(width, height);
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
        ref={ref}
      />
    </Html>
  );
});

export { EditableTextInput };
