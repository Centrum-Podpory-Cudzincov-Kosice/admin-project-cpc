import {ReactNode} from "react";
import LanguageProvider from "@/app/providers/LanguageProvider";

export default function ArticleLayout({children}: {
    children: ReactNode;
}) {
    return (
        <section className={"white-bg"}>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </section>
    );
}