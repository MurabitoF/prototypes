import { useEffect } from "react";
import { Allotment } from "allotment";
import Sidebar from "./components/Sidebar";
import "allotment/dist/style.css";
import LayoutManager from "./components/LayoutManager/LayoutManager";
import { useEditorStore } from "./state/store";

function App() {
  const theme = useEditorStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
  }, [theme]);

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
