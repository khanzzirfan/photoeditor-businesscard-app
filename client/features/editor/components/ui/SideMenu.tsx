import React from 'react';

interface Props {
  children: React.ReactNode;
}

function SideMenu({ children }: Props) {
  return (
    <div className="flex flex-col bg-gray-700 overflow-y-auto">{children}</div>
  );
}

export default SideMenu;
