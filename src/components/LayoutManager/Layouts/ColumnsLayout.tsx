import { Allotment } from "allotment";
import Editor from "../../Editor";
import Viewer from "../../Viewer";

const ColumnsLayout = () => {
  return (
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
      <Allotment.Pane>
        <Viewer />
      </Allotment.Pane>
    </Allotment>
  );
};

export default ColumnsLayout;
