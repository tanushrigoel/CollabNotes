import React, { useCallback, useEffect, useMemo } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { currNote, currNoteId, currUser, notes } from "../store/atoms/count";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebaseapp";
import _ from "lodash";
export const Markdown1 = () => {
  const [currnote, setcurrnote] = useRecoilState(currNote);
  const [currId, setcurrId] = useRecoilState(currNoteId);
  const curruser = useRecoilValue(currUser);
  const saveToLocalStorage = useCallback(
    _.debounce((id, note) => {
      localStorage.setItem(`note-${id}`, note);
      console.log(`Saved note-${id} to localStorage`);
    }, 5000), // 10-second debounce delay
    [] // Dependencies array: empty to ensure it's created only once
  );
  const saveToFirestore = useCallback(
    _.debounce(async (id, note) => {
      try {
        if (!curruser.uid) {
          console.error("Error: curruser or curruser.id is undefined");
          return; // Exit early if curruser is not defined
        }
        if (!id || !note) {
          console.error("Error: currId or currnote is undefined");
          return; // Exit early if id or note is not defined
        }
        const noteRef = doc(db, "users", curruser.uid, "notes", id); // Update with correct user and note IDs
        await updateDoc(noteRef, { content: note });
        console.log(`Updated note-${id} to Firestore`);
      } catch (error) {
        console.error("Error updating note to Firestore:", error);
      }
    }, 10000), // 20-second debounce delay
    [] // Dependencies array: empty to ensure it's created only once
  );

  // Save to both localStorage and Firestore on note changes
  useEffect(() => {
    if (currId && currnote) {
      saveToLocalStorage(currId, currnote);
      if (curruser) saveToFirestore(currId, currnote);
    }
    // Cleanup on unmount
    // return () => {
    //   saveToLocalStorage.cancel();
    //   // if(curruser)
    //   saveToFirestore.cancel();
    // };
  }, [currnote]);

  const onChange = (value) => {
    setcurrnote(value);
  };

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

  return (
    <SimpleMDE
      value={currnote}
      options={customRendererOptions}
      onChange={onChange}
      className="min-h-screen text-white dark:bg-gray-900 "
    />
  );
};
