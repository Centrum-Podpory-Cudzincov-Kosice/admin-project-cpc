"use client";

import styles from "../../articles.module.css";
import {Editor} from "@tiptap/core";

export default function EditorPanel({editor}:{
    editor: Editor | null,
}) {
    if (!editor) return null;

    return (
        <div className={styles.EditorPanel}>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                Bold
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                Italic
            </button>

            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                H1
            </button>

            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                H2
            </button>

            <button
                onClick={() =>
                    editor.chain().focus().setParagraph().run()
                }
            >
                P
            </button>

            <button
                onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                Bullet List
            </button>

            <button
                onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
            >
                Numbered List
            </button>
        </div>
    );
}