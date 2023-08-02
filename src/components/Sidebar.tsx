import Autocomplete from "./Autocomplete";
import SidebarTab from "./SidebarTab";



const Sidebar = () => {
  return (
    <section className="sidebar-container bg-dark" style={{ overflow: 'visible'}}>
      <span className="logo">Pty</span>

      <SidebarTab>
          <Autocomplete />
      </SidebarTab>
    </section>
  );
};

export default Sidebar;

