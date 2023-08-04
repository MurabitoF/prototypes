interface Props {
  children: React.ReactNode;
}

const SidebarTab: React.FC<Props> = ({ children }) => {
  if(children === null) return

  return <div className="sidebar-tab bg-dark">{children}</div>;
};

export default SidebarTab;
