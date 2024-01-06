import React from "react";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import SideMenuPanel from "../ui/SideMenuPanel";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { imagesState, ImageState } from "../../state/atoms/ui";
import { DropzoneFiles } from "./Dropzonefiles";
import { IconButton } from "../Buttons/IconButton";
import { useDndImageUpdater } from "../../hooks/useDndImageUpdater";
import { DraggableImage } from "./DraggableImage";

// css: themes
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// TODO: clear images at some point (when leaving editor?)
function ImageToolPanel() {
  const [images, setImages] = useRecoilState(imagesState);
  const totalImages = images.length;
  const { handleOnAddImage, handleOnRemoveImage } = useDndImageUpdater();

  const onMediaUpload = async (acceptedFiles: any) => {
    const numberofFiles = acceptedFiles.length;
    const readFileAsDataURL = (file: any) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    };

    for (let i = 0; i < numberofFiles; i++) {
      let acceptedFile = acceptedFiles[i];
      const fileName = acceptedFile.name;
      const dataUrl = await readFileAsDataURL(acceptedFile);
      const newImage = {
        name: fileName,
        src: dataUrl as string,
        file: acceptedFile,
        id: Math.random().toString(36).substr(2, 9),
      };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const settings = React.useMemo(() => {
    const toShow = totalImages > 3 ? 3 : totalImages;
    const slickSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: toShow,
      slidesToScroll: toShow,
      arrows: false,
      draggable: false,
      focusOnSelect: true,
    };
    return slickSettings;
  }, [totalImages]);

  return (
    <SideMenuPanel title="Image">
      <DropzoneFiles onMediaUpload={onMediaUpload} />
      <div class="px-1 mt-4">
        <Slider {...settings}>
          {images.map((file: ImageState) => (
            // @ts-ignore
            <div key={file.id}>
              <DraggableImage src={file.src} id={file.id} />
              <div className="flex flex-row flex-1 justify-center gap-2 py-2">
                <IconButton
                  color="gray"
                  onClick={handleOnAddImage}
                  id={file.id}
                >
                  <PlusCircleIcon className="h-4 w-4" />
                </IconButton>
                <IconButton
                  color="red"
                  onClick={handleOnRemoveImage}
                  id={file.id}
                >
                  <TrashIcon className="h-4 w-4" />
                </IconButton>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </SideMenuPanel>
  );
}

export default ImageToolPanel;
