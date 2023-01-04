import { ComponentProps, FC } from "react";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";

import styles from "@/components/Editor/Editor.module.scss";
import { theme } from "@/components/Editor/Theme/editorTheme";
import { nodes } from "@/components/Editor/nodes/nodes";
import { AutoFocusPlugin } from "@/components/Editor/plugins/AutoFocusPlugin";
import { CodeHighlightPlugin } from "@/components/Editor/plugins/CodeHighlightPlugin";
import { InlineToolbarPlugin } from "@/components/Editor/plugins/InlineToolbarPlugin";
import { ToolbarPlugin } from "@/components/Editor/plugins/ToolbarPlugin";
import { ExportPlugin } from "@/components/Editor/plugins/ExportPlugin";

const initialConfig: ComponentProps<typeof LexicalComposer>["initialConfig"] = {
  namespace: "SilkhorseEditor",
  onError: (error) => console.error(error),
  nodes: nodes,
  theme: theme,
};

type Props = {
  changeText: (value: string) => void;
};

export const Editor = (props: Props) => {
  const exportAsHTML = (contenAsHTML: string) => {
    props.changeText(contenAsHTML);
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="bg-teal-700 flex rounded-t-md border-2 border-gray-300">
        <InlineToolbarPlugin />
        <ToolbarPlugin />
      </div>
      <div className={styles.editorContainer}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.contentEditable} />
          }
          placeholder={<div className={styles.placeholder}>投稿内容を入力</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <AutoFocusPlugin />
      <HistoryPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <CodeHighlightPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <ExportPlugin exportAsHTML={exportAsHTML} />
    </LexicalComposer>
  );
};
