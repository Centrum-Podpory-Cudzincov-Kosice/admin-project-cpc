import {MultilingualArticle} from "cpc-shared";

export default function localizeArticle(
    multilingualArticle: MultilingualArticle,
    lang: string
): {
    date: string,
    title: string,
} {
    let title: string

    switch (lang) {
        case "en":
            title = multilingualArticle.title_en;
            break;
        case "uk":
            title = multilingualArticle.title_ua;
            break;
        default:
            title = multilingualArticle.title_sk;
    }

    const date = new Date(multilingualArticle.date).toLocaleDateString(lang)

    return {title, date}
}