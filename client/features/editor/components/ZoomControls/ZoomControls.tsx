import React from 'react';
import DropdownMenuAnchor from '../../../../components/ui/DropdownMenu/DropdownMenuAnchor';
import DropdownMenu from '../../../../components/ui/DropdownMenu/DropdownMenu';
import DropdownMenuButton from '../../../../components/ui/DropdownMenu/DropdownMenuButton';
import useDropdown from '../../../../components/ui/Dropdown/useDropdown';
import useZoomControls from '../../hooks/useZoomControls';
import ClearButton from '../ui/ClearButton';
import classNames from '../../../../utils/classNames';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import { useRecoilState } from 'recoil';
import { zoomState } from '../../state/atoms/editor';

function ZoomControls() {
  const [zoom, setZoom] = useRecoilState(zoomState);
  const { fillToScreen, fitToScreen } = useZoomControls();
  const { setTargetElement, targetElement } = useDropdown();

  return (
    <DropdownMenu
      placement="bottom"
      targetElement={targetElement}
      target={({ open }) => (
        <div ref={setTargetElement}>
          <Tooltip content="Zoom" className="mt-auto" closed={open}>
            <DropdownMenuAnchor
              as={ClearButton}
              className={classNames(
                'px-2.5',
                open && 'bg-gray-100 ring-gray-300 ring-2'
              )}
            >
              {Math.floor(zoom * 100)}%
            </DropdownMenuAnchor>
          </Tooltip>
        </div>
      )}
    >
      <div className="overflow-y-auto divide-y divide-gray-100">
        <div>
          {[3, 2, 1.25, 1, 0.75, 0.5, 0.25, 0.1].map((scale) => (
            <DropdownMenuButton onClick={() => setZoom(scale)} key={scale}>
              {scale * 100}%
            </DropdownMenuButton>
          ))}
        </div>
        <div>
          <DropdownMenuButton onClick={fitToScreen}>Fit</DropdownMenuButton>
          <DropdownMenuButton onClick={fillToScreen}>Fill</DropdownMenuButton>
        </div>
      </div>
    </DropdownMenu>
  );
}

export default ZoomControls;
