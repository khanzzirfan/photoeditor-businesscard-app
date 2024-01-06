import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainArea from "../../components/layout/MainArea";
import Alert from "../../components/ui/Alert";
import ExternalLink from "../../components/ui/ExternalLink";
import { loadFonts } from "../../utils/fonts";
import CanvasRenderer from "./components/CanvasRenderer/CanvasRenderer";
import EditorMenu from "./components/EditorMenu/EditorMenu";
import EditorMenuPanel from "./components/EditorMenuPanel/EditorMenuPanel";
import HistoryControls from "./components/HistoryControls/HistoryControls";
import ProgressModal from "./components/ProgressModal/ProgressModal";
import ZoomControls from "./components/ZoomControls/ZoomControls";
import { PRELOAD_FONTS } from "./constants";
import { AudioControlsContainer } from "./containers/AudioControlsContainer";
import { EditorAreaContainer } from "./containers/EditorAreaContainer";
import EditorFocusController from "./controllers/EditorFocusController";
import HistoryController from "./controllers/HistoryController";
import UnsavedChangesController from "./controllers/UnsavedChangesController";
import useEditorKeyCommand from "./hooks/useEditorKeyCommand";
import useTemplate from "./hooks/useTemplate";
import useElementsDispatcher from "./state/dispatchers/elements";
import useHistoryDispatcher from "./state/dispatchers/history";

function Editor() {
  const { redo, undo } = useHistoryDispatcher();
  const { deleteSelectedElement } = useElementsDispatcher();
  const { downloadTemplate } = useTemplate();

  useEffect(() => {
    loadFonts(PRELOAD_FONTS);
  }, []);

  useEditorKeyCommand(
    "ctrl+s",
    downloadTemplate,
    process.browser ? document : undefined
  );
  useEditorKeyCommand("ctrl+z", undo, process.browser ? document : undefined);
  useEditorKeyCommand("ctrl+y", redo, process.browser ? document : undefined);
  useEditorKeyCommand(
    "ctrl+shift+z",
    redo,
    process.browser ? document : undefined
  );

  const handleKeyDown = useEditorKeyCommand("delete", deleteSelectedElement);

  return (
    <AudioControlsContainer.Provider>
      <EditorAreaContainer.Provider>
        <UnsavedChangesController />
        <EditorFocusController />
        <HistoryController />
        <ProgressModal />
        <DndProvider backend={HTML5Backend}>
          <div className="fixed inset-0 bg-white z-10 p-4 overflow-auto sm:hidden">
            <div style={{ minWidth: 320 }}>
              <Alert title="editor is not available on Mobile">
                Please view it on larger screen.
              </Alert>
              <p className="mt-4 text-sm text-center text-gray-400">
                Contact support through
                <ExternalLink
                  className="mx-1"
                  newTab
                  to="support@editormedia.io"
                >
                  support@unknown.io
                </ExternalLink>
              </p>
            </div>
          </div>

          <div className="flex flex-grow overflow-hidden">
            <EditorMenu />
            <div className="flex flex-grow flex-col overflow-hidden">
              <div className="flex flex-grow overflow-hidden">
                <div className="flex flex-col">
                  <EditorMenuPanel />
                  <div className="py-1.5 px-2 space-x-2 flex w-full border-r bg-white justify-center border-t">
                    <HistoryControls />
                    <ZoomControls />
                  </div>
                </div>
                <MainArea
                  onKeyDown={handleKeyDown}
                  className="relative overflow-hidden"
                  noScroll
                >
                  <CanvasRenderer />
                </MainArea>
              </div>
            </div>
          </div>
        </DndProvider>
      </EditorAreaContainer.Provider>
    </AudioControlsContainer.Provider>
  );
}

export default Editor;
