"use client";

import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {marked} from "marked";
import {SaveBtn} from "@/features/articles/article/SaveBtn";
import EditorPanel from "@/features/articles/article/EditorPanel";
import {useEffect} from "react";

export function TipTapEditorContent({text, articleId, onChange}: {
    text: string | null,
    articleId: string,
    onChange: (value: string) => void
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content: text ? marked.parse(text) : "",
        immediatelyRender: false,

        onUpdate({editor}) {
            onChange(editor.getHTML());
        }
    });

    useEffect(() => {
        if (!editor) return;

        const current = editor.getHTML();
        const incoming = text ? marked.parse(text) : "";

        if (current !== incoming) {
            editor.commands.setContent(incoming, {
                emitUpdate: false,
            });
        }
    }, [text, editor]);

    return (
        <div>
            <EditorPanel editor={editor}/>
            <EditorContent editor={editor}/>
            <SaveBtn articleId={articleId}
                     editor={editor}
            />
        </div>
    );
}