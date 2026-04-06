import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

type Locale = "ar" | "he" | "en";

const rtlLocales: Locale[] = ["ar", "he"];

const fontMap: Record<Locale, string> = {
  ar: "font-cairo",
  he: "font-heebo",
  en: "font-ubuntu",
};

export const metadata: Metadata = {
  title: "DevLens — Custom Digital Systems for Every Business",
  description:
    "DevLens builds custom websites, web apps, booking systems, digital menus and more — fully tailored to your business. No templates, no generic solutions.",
  keywords: "custom websites, web development, booking systems, digital menus, business websites, DevLens",
  openGraph: {
    title: "DevLens — Custom Digital Systems",
    description: "We build digital systems tailored to your business, not generic websites.",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DevLens",
  },
  icons: {
    apple: "/icon-192.png",
  }
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";
  const fontClass = fontMap[locale as Locale] ?? "font-cairo";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0A0A0F" />
        <link rel="manifest" href="/manifest.json" />
        {/* Non-render-blocking Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Heebo:wght@300;400;500;600;700;800;900&family=Ubuntu:wght@300;400;500;700&display=swap"
        />
      </head>
      <body lang={locale} className={fontClass} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
