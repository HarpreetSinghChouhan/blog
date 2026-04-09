import "./globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto'
})
import ThemeRegistry from "./theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`} >
        <ThemeRegistry  >  {children}  </ThemeRegistry>
      </body>
    </html>
  );
}
