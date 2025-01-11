import React from "react";
import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

function Markdown() {
  return (
    <MDXEditor
      markdown={"# Hello from markdown"}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
      ]}
      contentEditableClassName="outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 
        prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 
        prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] 
        dark:bg-primary-dark dark:text-slate-600 dark:caret-yellow-300 dark:prose-code:text-yellow-400"
    ></MDXEditor>
  );
}

export default Markdown;
