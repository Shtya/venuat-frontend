import '../../styles/style.scss';
import '../../styles/tailwind.css';

import { NextIntlClientProvider, useMessages } from 'next-intl';
import Layout from '@/components/molecules/layout/LayoutApp';
import Head from 'next/head';

export const metadata = {
    title: 'Luxury Wedding Hall and Event Venue Booking Across Saudi Arabia',
    description: 'Make your wedding unforgettable with a wide selection of stunning designs and spacious venues tailored for unique events.',
    icons: { icon: '/assets/logo-white.svg' },
    openGraph: {
        title: 'Luxury Wedding Hall and Event Venue Booking Across Saudi Arabia',
        description: 'Make your wedding unforgettable with a wide selection of stunning designs and spacious venues tailored for unique events.',
        url: 'https://venuat1.vercel.app/ar',
        type: 'website',
        images: [
            {
                url: 'https://venuat1.vercel.app/_next/image?url=%2Fassets%2Ftest-img%2F2.png&w=256&q=75',
                width: 1200,
                height: 630,
                alt: 'Luxury Wedding Hall and Event Venue',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Luxury Wedding Hall and Event Venue Booking Across Saudi Arabia',
        description: 'Make your wedding unforgettable with a wide selection of stunning designs and spacious venues tailored for unique events.',
        images: ['https://example.com/twitter-image-wedding.jpg'],
    },
};

export default function RootLayout({ children, params: { locale } }) {
    const messages = useMessages();

    return (
        <html lang={locale} dir={locale == 'en' ? 'ltr' : 'rtl'}>
            <Head>
                <meta name='description' content='Make your wedding unforgettable with a wide selection of stunning designs and spacious venues tailored for unique events.' />
                <meta name='keywords' content='wedding halls, luxury venues, event booking, Saudi Arabia weddings, unique event spaces' />

                {/* Open Graph Tags (Specific to WhatsApp/Facebook) */}
                <meta property='og:title' content='Luxury Wedding Hall and Event Venue Booking Across Saudi Arabia' />
                <meta property='og:description' content='Make your wedding unforgettable with a wide selection of stunning designs and spacious venues tailored for unique events.' />
                <meta property='og:image' content='https://example.com/og-image-wedding.jpg' />
                <meta property='og:url' content='https://example.com' />
                <meta property='og:type' content='website' />

                {/* Twitter Card */}
                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:title' content='Luxury Wedding Hall and Event Venue Booking Across Saudi Arabia' />
                <meta name='twitter:description' content='Make your wedding unforgettable with a wide selection of stunning designs and spacious venues tailored for unique events.' />
                <meta name='twitter:image' content='https://example.com/twitter-image-wedding.jpg' />
            </Head>

            <body className=' '>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <main>
                        <Layout> {children} </Layout>
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
