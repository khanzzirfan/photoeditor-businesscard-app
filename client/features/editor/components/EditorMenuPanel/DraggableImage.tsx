import React from "react";
import { useDrag } from "react-dnd";
import { DROPTYPES } from "../../constants";

export interface DraggableImageProps {
  src: string;
  id: string;
}

export const DraggableImage = (props: DraggableImageProps) => {
  const { src, id } = props;
  const [{ isDragging }, drag] = useDrag({
    type: DROPTYPES.IMAGE,
    item: { id: id, type: DROPTYPES.IMAGE },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.6 : 1;
  return (
    <div ref={drag} style={{ opacity }}>
      <img
        className="px-1 object-cover w-full h-full"
        src={src}
        alt="altfile"
      />
    </div>
  );
};
