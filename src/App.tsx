import { Allotment } from "allotment";
import Editor from "./components/Editor";
import "allotment/dist/style.css";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#282c34" }}
    >
      <Allotment vertical snap>
        <Allotment.Pane>
          <iframe
            width="100%"
            height="100%"
            style={{ border: "none", backgroundColor: "white" }}
          />
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
    </div>
  );
}

export default App;
