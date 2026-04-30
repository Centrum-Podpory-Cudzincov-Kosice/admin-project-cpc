"use client";

import styles from "../articles.module.css";
import {ArticleType} from "cpc-shared";
import {useState} from "react";
import clsx from "clsx";
import ArticlesList from "@/features/articles/articles/ArticlesList";

export default function ArticlesByType() {
    const [type, setType] = useState(ArticleType.NEWS);

    return (
        <div className={styles.ArticlesList}>
            <div className={styles.typesButtons}>
                <button className={clsx(type === ArticleType.NEWS
                    && styles.selectedBtn)}
                        onClick={() => setType(ArticleType.NEWS)}>
                    News
                </button>

                <button className={clsx(type === ArticleType.EVENT
                    && styles.selectedBtn)}
                        onClick={() => setType(ArticleType.EVENT)}>
                    Events
                </button>
            </div>

            <ArticlesList type={type}/>
        </div>
    );
}