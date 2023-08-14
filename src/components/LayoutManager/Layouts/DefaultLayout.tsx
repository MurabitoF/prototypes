import { Allotment } from "allotment";
import Viewer from "../../Viewer";
import Editor from "../../Editor";

const DefaultLayout = () => {
  return (
    <Allotment vertical snap>
      <Allotment.Pane>
        <Viewer />
      </Allotment.Pane>
      <Allotment.Pane>
        <Allotment snap>
          <Allotment.Pane>
            <Editor language="html" />
          </Allotment.Pane>
          <Allotment.Pane snap={false}>
            <Editor language="css" />
          </Allotment.Pane>
          <Allotment.Pane>
            <Editor language="javascript" />
          </Allotment.Pane>
        </Allotment>
      </Allotment.Pane>
    </Allotment>
  );
};

export default DefaultLayout;
