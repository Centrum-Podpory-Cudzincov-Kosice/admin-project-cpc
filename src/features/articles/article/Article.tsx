"use client";

import {ArticleContainer, ArticleText, BackBtn, Gallery, MultilingualArticle} from "cpc-shared";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {TipTapEditorContent} from "@/features/articles/article/TipTapEditorContent";
import {AddImageBtn} from "@/features/articles/article/AddImageBtn";

export default function Article({articleData}: {
    articleData: MultilingualArticle
}) {
    const {push} = useRouter();

    const {i18n} = useTranslation();
    const currentLanguage = i18n?.resolvedLanguage?.slice(0, 2) ?? "sk";

    const backHandler = () => {
        push("/articles");
    }

    return (
        <ArticleContainer>
            <BackBtn onBack={backHandler}>
                ← Späť
            </BackBtn>

            {articleData?.images ? (
                <Gallery images={articleData.images}/>
            ) : (
                <AddImageBtn articleId={articleData.id}/>
            )}

            <ArticleText articleData={articleData}
                         lang={currentLanguage}
                         Content={TipTapEditorContent}
            />
        </ArticleContainer>
    );
}