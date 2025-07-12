import { Inter, Merriweather, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const merriweather = Merriweather({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${merriweather.variable} ${ibmPlexMono.variable}`}
    >
      {children}
    </div>
  );
}
