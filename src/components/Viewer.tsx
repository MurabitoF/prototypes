import { useEffect, useRef, useState } from "react";
import { Allotment } from "allotment";
import { useEditorStore } from "../state/store";
import { buildHTML } from "../utils/utils";

interface LogEntry {
  level: string;
  text: string;
}

// Forwards console calls and uncaught errors from the preview to the parent window
const CONSOLE_BRIDGE = `<script>
(() => {
  const fmt = (a) => {
    if (typeof a === "string") return a;
    if (a instanceof Error) return a.stack || String(a);
    try { return JSON.stringify(a) ?? String(a); } catch { return String(a); }
  };
  const send = (level, args) =>
    parent.postMessage({ source: "pty-console", level, text: args.map(fmt).join(" ") }, "*");
  for (const level of ["log", "info", "warn", "error", "debug"]) {
    const original = console[level];
    console[level] = (...args) => { send(level, args); original.apply(console, args); };
  }
  addEventListener("error", (e) => send("error", [e.message]));
  addEventListener("unhandledrejection", (e) => send("error", ["Uncaught (in promise)", e.reason]));
})();
</script>`;

const Viewer = () => {
  const html = useEditorStore((state) => state.html);
  const css = useEditorStore((state) => state.css);
  const js = useEditorStore((state) => state.javascript);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const srcDoc = buildHTML({ html, css, js, head: CONSOLE_BRIDGE });

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.source !== "pty-console") return;
      setLogs((prev) => [...prev, { level: event.data.level, text: event.data.text }]);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => setLogs([]), [srcDoc]);

  return (
    <Allotment vertical>
      <Allotment.Pane>
        <iframe
          ref={iframeRef}
          title="Preview"
          // no allow-same-origin: shared code can't touch the app's storage
          sandbox="allow-scripts allow-modals allow-forms allow-popups"
          width="100%"
          height="100%"
          style={{ border: "none", background: "#fff" }}
          srcDoc={srcDoc}
        />
      </Allotment.Pane>
      <Allotment.Pane minSize={26} preferredSize={120} snap>
        <div className="console">
          <div className="editor-header console-header">
            CONSOLE {logs.length > 0 && `(${logs.length})`}
            <button type="button" className="console-clear" onClick={() => setLogs([])}>
              Clear
            </button>
          </div>
          <div className="console-body">
            {logs.map((log, index) => (
              <pre key={index} className={`console-line console-${log.level}`}>
                {log.text}
              </pre>
            ))}
          </div>
        </div>
      </Allotment.Pane>
    </Allotment>
  );
};

export default Viewer;
