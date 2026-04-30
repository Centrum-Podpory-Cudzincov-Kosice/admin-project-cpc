import {createServerClient} from '@supabase/ssr';
import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll: () => req.cookies.getAll(),
                setAll: (cookies) => {
                    cookies.forEach(({name, value}) =>
                        req.cookies.set(name, value)
                    );
                },
            },
        }
    );

    const {data: {user}} = await supabase.auth.getUser();

    if (req.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return res;
}

export const config = {
    matcher: ['/admin/:path*'],
};