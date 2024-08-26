import '@/app/ui/global.css'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dul'ong",  
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html>
        <body>
          {/* Layout UI */}
          <div>{children}</div>
        </body>
      </html>
    );
  }
