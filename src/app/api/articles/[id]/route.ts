import {createClient} from "@/lib/supabase/server";

export async function GET(req: Request, {params}: {
                              params: Promise<{ id: string }>
                          }) {
    const supabase = await createClient();

    const {id} = await params;

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return Response.json({error}, {status: 500});
    }

    return Response.json(data);
}

export async function POST(req: Request, {params}: {
    params: Promise<{ id: string }>
}) {
    const supabase = await createClient();

    const {id} = await params;

    const body = await req.json();

    const field = "description_" + body.lang;

    const {data, error} = await supabase
        .from("articles")
        .update({[field]: body.text})
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return Response.json({error: error}, {status: 500});
    }

    return Response.json(data);
}