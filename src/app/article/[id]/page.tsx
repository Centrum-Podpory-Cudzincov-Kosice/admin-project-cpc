import { createClient } from "@/lib/supabase/server";
import {notFound} from "next/navigation";
import Article from "@/features/articles/article/Article";

export default async function ArticlePage({params}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    if (!id) notFound();

    const supabase = await createClient();

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) notFound();

    return <Article articleData={data} />;
}