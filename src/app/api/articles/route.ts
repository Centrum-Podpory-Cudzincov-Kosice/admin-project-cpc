import { createClient } from "@/lib/supabase/server";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const supabase = await createClient();

    let query = supabase
        .from("articles")
        .select("id, title_sk, date")
        .order("date", { ascending: false });

    if (type) {
        query = query.eq("type", type);
    }

    const { data, error } = await query;

    if (error) {
        return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
}

export async function POST(req: Request) {
    const supabase = await createClient();

    const {data: { user }} = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await req.json();

    const { data, error } = await supabase
        .from('articles')
        .insert(body);

    return NextResponse.json({ data, error });
}