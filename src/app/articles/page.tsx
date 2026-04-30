import styles from "@/features/articles/articles/articles.module.css";
import ArticlesByType from "@/features/articles/articles/ArticlesByType";
import {redirect} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import LogOut from "@/features/auth/LogOut";

export default async function ArticlesPage() {
    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) redirect('/login');

    const {data: profile} = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        redirect('/');
    }

    return (
        <main className={styles.articles}>
            <LogOut/>

            <h1>
                Članky
            </h1>

            <ArticlesByType/>
        </main>
    );
}