import React, { useRef } from "react";
import styles from "./CodeEditor.module.scss";
import MonacoEditor, { OnMount, OnChange } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import codeShift from "jscodeshift";
import "./syntax.css";

//@ts-ignore
import Highlighter from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  const onEditorContentChange: OnChange = (value) => {
    onChange(value);
  };
  const onEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      editor
    );
    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    );
  };
  const onFormatClick = () => {
    // Format with prettier
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier.format(unformatted, {
      parser: "babel",
      useTabs: false,
      semi: true,
      singleQuote: false,
      plugins: [parser],
    });
    editorRef.current.setValue(formatted);
  };
  return (
    <div className={styles.editorWrapper}>
      <button
        type="button"
        onClick={onFormatClick}
        className={`button button-format is-primary is-small ${styles.buttonFormat}`}
      >
        Apply Prettier
      </button>
      <MonacoEditor
        height="500px"
        language="javascript"
        theme="vs-dark"
        value={initialValue}
        onChange={onEditorContentChange}
        onMount={onEditorMount}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
