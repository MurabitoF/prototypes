import { Allotment } from "allotment";
import Sidebar from "./components/Sidebar";
import "allotment/dist/style.css";
import LayoutManager from "./components/LayoutManager/LayoutManager";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Allotment separator={false}>
        <Allotment.Pane minSize={70} maxSize={70}>
          <Sidebar />
        </Allotment.Pane>
        <Allotment.Pane>
          <LayoutManager />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
