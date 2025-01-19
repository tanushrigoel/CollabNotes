import React, { useCallback, useEffect, useState, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { currNote, notes } from "../store/atoms/count";

export const Markdown1 = () => {
  const [note, setNote] = useRecoilState(currNote);
  const notelist = useRecoilValue(notes);
  const [notevalue, setnoteValue] = useState(() => {
    const savedNote = localStorage.getItem(`note-${note}`);
    return savedNote ? savedNote : notelist[note].content;
  });

  useEffect(() => {
    const savedNote = localStorage.getItem(`note-${note}`);
    setnoteValue(savedNote ? savedNote : notelist[note].content);
  }, [note, notelist]);

  useEffect(() => {
    localStorage.setItem(`note-${note}`, notevalue);
  }, [notevalue, note]);

  console.log(note);
  console.log(notevalue);

  const customRendererOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "demo",
        delay:500,
      },
      previewRender() {
        return ReactDOMServer.renderToString(
          <ReactMarkdown
            source={text}
            renderers={{
              CodeBlock: CodeRenderer,
              Code: CodeRenderer,
            }}
          />
        );
      },
    };
  }, []);

  // const [value, setValue] = useState("Initial value");

  const onChange = useCallback((value) => {
    setnoteValue(value);
  }, []);

  return (
    <SimpleMDE
      value={notevalue}
      options={customRendererOptions}
      onChange={onChange}
      className="min-h-screen text-white dark:bg-gray-900 "
    />
  );
};
