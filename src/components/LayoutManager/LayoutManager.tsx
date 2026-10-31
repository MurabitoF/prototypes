import { Allotment } from "allotment";
import Editor from "../Editor";
import Viewer from "../Viewer";
import { useEditorStore } from "../../state/store";
import { type LanguagesType } from "../../types";

const LANGUAGES: LanguagesType[] = ["html", "css", "javascript"];

const LayoutManager = () => {
  const layout = useEditorStore((state) => state.layout);

  const editors = LANGUAGES.map((language) => (
    <Allotment.Pane key={language} snap={language !== "css"}>
      <Editor language={language} />
    </Allotment.Pane>
  ));
  const viewer = (
    <Allotment.Pane key="viewer">
      <Viewer />
    </Allotment.Pane>
  );

  if (layout === "columns" || layout === "rows") {
    return (
      <Allotment key={layout} vertical={layout === "rows"} snap>
        {editors}
        {viewer}
      </Allotment>
    );
  }

  const editorsRow = (
    <Allotment.Pane key="editors">
      <Allotment snap>{editors}</Allotment>
    </Allotment.Pane>
  );
  return (
    <Allotment key={layout} vertical snap>
      {layout === "default" ? [viewer, editorsRow] : [editorsRow, viewer]}
    </Allotment>
  );
};

export default LayoutManager;
