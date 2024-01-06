import { useRecoilState } from "recoil";
import { ShapeType } from "../interfaces/Shape";
import useImageInput from "../hooks/useImageInput";
import useElementsDispatcher from "../state/dispatchers/elements";
import { imagesState } from "../state/atoms/ui";

export const useDndImageUpdater = () => {
  const { createElement } = useElementsDispatcher();
  const { changeImage } = useImageInput();
  const [images, setImages] = useRecoilState(imagesState);

  const handleOnAddImage = async (id: string) => {
    const file = images.find((image) => image.id === id)?.file;
    if (file) {
      const defaultProps = await changeImage(file);
      createElement(ShapeType.Image, {
        ...defaultProps,
        blurRadius: 0,
        imageFit: "fill",
      });
    }
  };

  const handleOnRemoveImage = (id: string) => {
    setImages((images) => images.filter((image) => image.id !== id));
  };

  return { handleOnAddImage, handleOnRemoveImage };
};
