"use client";

import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {marked} from "marked";
import {SaveBtn} from "@/features/articles/ui/article/SaveBtn";
import EditorPanel from "@/features/articles/ui/article/EditorPanel";

export function TipTapEditorContent({text, lang, articleId}: {
    text: string,
    lang: string,
    articleId?: string
}) {
    if (!articleId) throw new Error("No article id found");

    const editor = useEditor({
        extensions: [StarterKit],
        content: marked.parse(text),
        immediatelyRender: false,
    });

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