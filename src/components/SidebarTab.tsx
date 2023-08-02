
interface Props {
  children: React.ReactNode
}

const SidebarTab: React.FC<Props> = ({children}) => {
  return (
    <div className="sidebar-tab bg-dark">
      {children}
    </div>
  )
}

export default SidebarTab