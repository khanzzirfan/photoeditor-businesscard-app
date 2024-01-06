import React from "react";

interface IconButtonProps {
  onClick: (id: string) => void;
  children: React.ReactNode;
  color: "green" | "red" | "gray" | "yellow" | "blue";
  id: string;
}

export const IconButton = (props: IconButtonProps) => {
  const { onClick, children, color = "gray", id } = props;
  const colorCss = `px-0 py-0 text-xs font-medium text-center inline-flex items-center text-white bg-${color}-500 rounded-sm hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`;
  const handleClick = () => {
    onClick(id);
  };

  return (
    <button type="button" onClick={handleClick} className={colorCss}>
      {children}
    </button>
  );
};
