import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

const onest = localFont({
    src: [
        {
            path: "../../public/fonts/Onest/static/Onest-Medium.ttf",
            weight: "300",
            style: "medium",
        },
        {
            path: "../../public/fonts/Onest/Onest-VariableFont_wght.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/Onest/static/Onest-Bold.ttf",
            weight: "600",
            style: "bold",
        },
    ],
    variable: "--font-onest",
});

export const metadata: Metadata = {
    title: "CPC admin panel",
    description: "Panel for editing content of CPC website",
};

export default function RootLayout({children}: {
    children: React.ReactNode,
}) {
    return (
        <html lang={"en"} className={onest.variable}>
        <body>
            {children}
        </body>
        </html>
    );
}