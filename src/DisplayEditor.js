import React, { useState } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";

// Function kept outside of the component so they won't get recreated
// and they will be easier to test

const loadContent = () => {
  const savedData = localStorage.getItem("DraftEditorContentJson");
  return savedData ? JSON.parse(savedData) : null;
};

const handleSetEditorContent = setEditorState => () => {
  const rawEditorData = loadContent();
  if (rawEditorData !== null) {
    const contentState = convertFromRaw(rawEditorData);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  } else {
    setEditorState(EditorState.createEmpty());
  }
};

const DisplayEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <div>
      <div>
        <button onClick={handleSetEditorContent(setEditorState)}>
          Load content
        </button>
      </div>
      <Editor editorState={editorState} readOnly={true} />
    </div>
  );
};

export default DisplayEditor;
