"use client";

import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {marked} from "marked";
import {SaveBtn} from "@/features/articles/article/SaveBtn";
import EditorPanel from "@/features/articles/article/EditorPanel";
import {useEffect, useMemo} from "react";

export function TipTapEditorContent({text, lang, articleId}: {
    text: string | null,
    lang: string,
    articleId: string
}) {
    const parsed = useMemo(() => {
        if (!text) return "";
        return marked.parse(text)
    }, [text]);

    const editor = useEditor({
        extensions: [StarterKit],
        content: parsed,
        immediatelyRender: false,
    });

    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    if (!editor) return null;

    return (
        <div>
            <EditorPanel editor={editor}/>
            <EditorContent editor={editor}/>
            <SaveBtn articleId={articleId}
                     editor={editor}
                     lang={lang}
            />
        </div>
    );
}