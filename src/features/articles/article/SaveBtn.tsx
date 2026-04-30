"use client";

import styles from "../articles.module.css";
import {Editor} from "@tiptap/core";
import TurndownService from "turndown";

const turndown = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
});

turndown.addRule("paragraph", {
    filter: "p",
    replacement(content: string): string {
        return `\n\n${content.trim()}\n\n`;
    },
});

turndown.addRule("lineBreak", {
    filter: "br",
    replacement(): string {
        return "  \n";
    },
});

export function SaveBtn({
                            editor,
                            articleId,
                            lang,
                        }: {
    editor: Editor | null;
    articleId: string;
    lang: string;
}) {
    const handleSave = async () => {
        if (!editor) return;

        const html = editor.getHTML();
        const markdown = turndown.turndown(html);

        console.log("HTML OUTPUT:");
        console.log(html);

        console.log("MARKDOWN OUTPUT:");
        console.log(JSON.stringify(markdown));

        await fetch(`/api/articles/${articleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: markdown,
                lang,
            }),
        });
    };

    return (
        <button
            type="button"
            className={styles.SaveBtn}
            onClick={handleSave}
        >
            Uložiť
        </button>
    );
}