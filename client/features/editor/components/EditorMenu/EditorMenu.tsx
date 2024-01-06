import React from "react";
import SideMenu from "../ui/SideMenu";
import ImageToolButton from "./buttons/ImageToolButton";
import SettingsToolButton from "./buttons/SettingsToolButton";
import TextToolButton from "./buttons/TextToolButton";

function EditorMenu() {
  return (
    <SideMenu>
      <div className="flex flex-col flex-grow space-y-2 px-2 pt-2 pb-1.5 bg-gray-800">
        <SettingsToolButton />
        <TextToolButton />
        <ImageToolButton />
      </div>
    </SideMenu>
  );
}

export default EditorMenu;
