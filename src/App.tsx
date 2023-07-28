import { Allotment } from "allotment";
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";
import Sidebar from "./components/Sidebar";
import "allotment/dist/style.css";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh"}}
    >
      <Allotment separator={false} >
        <Allotment.Pane minSize={70} maxSize={70}>
          <Sidebar />
        </Allotment.Pane>
        <Allotment.Pane>
          <Allotment vertical snap>
            <Allotment.Pane>
              <Viewer />
            </Allotment.Pane>
            <Allotment.Pane>
              <Allotment snap>
                <Allotment.Pane>
                  <Editor language="html" />
                </Allotment.Pane>
                <Allotment.Pane>
                  <Editor language="css" />
                </Allotment.Pane>
                <Allotment.Pane>
                  <Editor language="javascript" />
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default App;
