import React, { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./TextEditor.scss";

interface TextEditorProps {}

const TextEditor: React.FC<TextEditorProps> = () => {
  const [value, setValue] = useState("# Header");
  const [editing, setEditing] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: false });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(value) => setValue(value || "")} />
      </div>
    );
  }

  return (
    <div onClick={() => setEditing(true)} className="text-editor card">
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
