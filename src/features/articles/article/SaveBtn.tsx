"use client";

import styles from "../article/article.module.css";
import {Editor} from "@tiptap/core";
import TurndownService from "turndown";
import {useLanguage} from "@/app/providers/LanguageProvider";

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

export function SaveBtn({editor, articleId}: {
    editor: Editor | null;
    articleId: string;
}) {
    const {lang} = useLanguage();

    const handleSave = async () => {
        if (!editor) return;

        const html = editor.getHTML();
        const markdown = turndown.turndown(html);

        await fetch(`/api/articles/${articleId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: markdown,
                lang
            }),
        });
    };

    let uploadBtnText;
    switch (lang) {
        case "en":
            uploadBtnText = "Upload";
            break;
        case "uk":
            uploadBtnText = "Зберегти";
            break;
        default:
            uploadBtnText = "Uložiť"
    }

    return (
        <button
            type="button"
            className={styles.SaveBtn}
            onClick={handleSave}
        >
            {uploadBtnText}
        </button>
    );
}