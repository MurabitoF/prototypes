import { useEditorStore } from "../state/store";
import { buildHTML } from "../utils/utils";

const Viewer = () => {
  const html = useEditorStore((state) => state.html);
  const css = useEditorStore((state) => state.css);
  const js = useEditorStore((state) => state.javascript);
  return (
    <iframe
      width="100%"
      height="100%"
      style={{ border: "none" }}
      srcDoc={buildHTML({ html, css, js })}
    />
  );
};

export default Viewer;

