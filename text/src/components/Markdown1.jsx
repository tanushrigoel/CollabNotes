import React, { useCallback, useEffect, useState, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
// import "xcatliu/simplemde-theme-base/master/dist/simplemde-theme-base.min.css"
import "easymde/dist/easymde.min.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { currNote, notes } from "../store/atoms/count";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseapp";
export const Markdown1 = () => {
  const [currnote, setcurrnote] = useRecoilState(currNote);
  // const notelist = useRecoilValue(notes);
  // const [notevalue, setnoteValue] = useState(notelist[note]);

  // useEffect(() => {
  //   // const savedNote = localStorage.getItem(`note-${note}`);
  //   setnoteValue(notelist[note]?.content);
  // }, [note, notelist]);
  // // savedNote ? savedNote :
  // useEffect(() => {
  //   // localStorage.setItem(`note-${note}`, notevalue);
  // }, [notevalue, note]);

  useEffect(() => {
    setcurrnote(currnote);
  }, [currnote]);

  // const unsub = onSnapshot(doc(db, "users"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });

  // console.log(note);
  // console.log(notevalue);

  const customRendererOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "demo",
        delay: 500,
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
    setcurrnote(value);
    // localStorage.setItem(`note-${note}`, notevalue);
  }, []);

  return (
    <SimpleMDE
      value={currnote}
      options={customRendererOptions}
      onChange={onChange}
      className="min-h-screen text-white dark:bg-gray-900 "
    />
  );
};
