"use client";

import styles from "../article/article.module.css";
import {ChangeEvent} from "react";
import axios from "axios";
import clsx from "clsx";

export const AddImageBtn = ({articleId}: {
    articleId: string
}) => {
    const addImage = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const {data} = await axios.post(
                `/api/articles/${articleId}/images`,
                formData
            );

            console.log("Uploaded:", data);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const inputId = `fileUpload-${articleId}`;

    return (
        <div>
            <input className={styles.addImgInput}
                   id={inputId}
                   type={"file"}
                   onChange={addImage}
            />
            <label htmlFor={inputId}
                   className={clsx("primaryBtn", styles.addImgBtn)}>
                Add image
            </label>
        </div>
    );
};