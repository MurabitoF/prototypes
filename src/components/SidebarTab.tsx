import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SidebarTab: React.FC<Props> = ({ children }) => {
  if(children === null || children === undefined) return <></>

  return (
    <div className="sidebar-tab bg-dark">
      {children}
    </div>
  );
};

export default SidebarTab;
