import { Allotment } from "allotment";
import Viewer from "../../Viewer";
import Editor from "../../Editor";


const InvertedLayout = () => {
  return (
    <Allotment vertical snap>
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
      <Allotment.Pane>
        <Viewer />
      </Allotment.Pane>
    </Allotment>
  )
}

export default InvertedLayout