"use client";

import style from "./article.module.css";
import {
    ArticleContainer,
    ArticleText,
    BackBtn,
    Gallery,
    MultilingualArticle
} from "cpc-shared";
import {useRouter} from "next/navigation";
import {TipTapEditorContent} from "@/features/articles/article/TipTapEditorContent";
import {AddImageBtn} from "@/features/articles/article/AddImageBtn";
import {useState} from "react";
import LanguageSwitcher from "@/features/articles/article/LanguageSwitcher";
import localizeArticle from "@/lib/utils/localizedArticle";
import {useLanguage} from "@/app/providers/LanguageProvider";

export default function Article({articleData}: {
    articleData: MultilingualArticle
}) {
    const {push} = useRouter();

    const {lang} = useLanguage();

    const {title, date} = localizeArticle(articleData, lang);

    const [texts, setTexts] = useState(() => {
        const initial: Record<string, string> = {};

        initial["sk"] = articleData.description_sk;
        initial["uk"] = articleData.description_ua;
        initial["en"] = articleData.description_en;

        return initial;
    });

    const updateText = (lang: string, value: string) => {
        setTexts(prev => ({
            ...prev, [lang]: value
        }));
    };

    const backHandler = () => {
        push("/articles");
    }

    let backBtnText;
    switch (lang) {
        case "en":
            backBtnText = "Back";
            break;
        case "uk":
            backBtnText = "Назад";
            break;
        default:
            backBtnText = "Späť"
    }

    return (
        <ArticleContainer>
            <div className={style.articleHeading}>
                <BackBtn onBack={backHandler}>
                    ← {backBtnText}
                </BackBtn>

                <LanguageSwitcher/>
            </div>

            {articleData?.images ? (
                <Gallery images={articleData.images}/>
            ) : (
                <AddImageBtn articleId={articleData.id}/>
            )}

            <ArticleText title={title} date={date}>
                <TipTapEditorContent text={texts[lang]}
                                     onChange={(value) =>
                                         updateText(lang, value)}
                                     articleId={articleData.id}
                />
            </ArticleText>
        </ArticleContainer>
    );
}