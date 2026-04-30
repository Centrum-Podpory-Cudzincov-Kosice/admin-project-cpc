"use client";

import styles from "@/features/articles/articles.module.css";
import {OrbitProgress} from "react-loading-indicators";
import {useEffect, useState} from "react";
import {ArticleType} from "cpc-shared";
import {useRouter} from "next/navigation";
import {ArticlesItem} from "@/features/articles/types";
import axios from "axios";

export default function ArticlesList({type}: { type: ArticleType }) {
    const {push} = useRouter();

    const [articles, setArticles] = useState<ArticlesItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);

                const res = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?type=${type}`);

                setArticles(res.data);
            } catch (e) {
                console.error(e);
                setError("Failed to fetch articles");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [type]);

    if (loading) return <ListLoading/>;
    if (error) return <ErrorField message={error}/>;

    return (
        <ul>
            {articles.map((article) => (
                <li key={article.id}
                    className={styles.tableRow}>
                    <h3>{article.title_sk}</h3>

                    <p className={styles.date}>{article.date.toString()}</p>

                    <button className={"primaryBtn"}
                            onClick={() => {
                                push("/article/" + article.id)
                            }}>
                        Upraviť
                    </button>
                </li>
            ))}
        </ul>
    );
}

const ListLoading = () => (
    <div className={styles.loading}>
        <OrbitProgress
            variant={"track-disc"}
            color={"#ffffff"}
            size={"medium"}
        />
    </div>
);

const ErrorField = ({message}: { message: string }) => (
    <div className={styles.error}>
        <p>{message}</p>
    </div>
);