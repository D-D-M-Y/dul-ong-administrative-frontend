import '@/app/ui/global.css'
import type { Metadata } from "next";
import { Roboto, PT_Sans, DM_Serif_Display, Source_Sans_3 } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'], // Include regular and bold weights
  variable: "--font-roboto",
  subsets: ["latin"],
});

const ptsans = PT_Sans({
  weight: ['400', '700'], // Include regular and bold weights
  variable: "--font-ptsans",
  subsets: ["latin"],
});

const dmserifdisplay = DM_Serif_Display({
  weight: '400', // DM Serif Display only has one weight
  variable: "--font-dmserif",
  subsets: ["latin"],
});

const sourcesans3 = Source_Sans_3({
  weight: ['400', '700'],
  variable: "--font-sourcesans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dul'ong",
  description: "Developed by Diaz, Diones, Montero, Yee",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto.variable} ${ptsans.variable} ${dmserifdisplay.variable} ${sourcesans3.variable}`}>
      <body>
        {/* Layout UI */}
        <div>{children}</div>
      </body>
    </html>
  );
}