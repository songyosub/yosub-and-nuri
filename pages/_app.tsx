import { NotificationProvider } from '@components/notification/NotificationContext';
import { DialogProvider } from '@hooks/useDialog';
import { PortalProvider } from '@providers/PortalProvider';
import { AnimateSharedLayout } from 'framer-motion';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import og from 'public/assets/data/og.json';
import React, { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { styled } from 'stitches.config';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Main = styled('main', {
  position: 'relative',
  maxWidth: 520,
  minWidth: 320,
  mx: 'auto',
  backgroundColor: '$white',
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    smoothscroll.polyfill();
  }, []);

  return (
    <>
      <SWRConfig
        value={{
          suspense: true,
        }}
      ></SWRConfig>
      <NextSeo
        title={og.title}
        description={og.description}
        openGraph={{
          type: 'website',
          url: og.url,
          title: og.title,
          description: og.description,
          site_name: og.sitename,
          images: [
            {
              url: '/assets/img/2-h-ocean-1.jpg',
              width: 1200,
              height: 630,
              alt: og.title,
            },
            {
              url: '/assets/img/2-h-ocean-1.jpg',
              width: 800,
              height: 418,
              alt: og.title,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/assets/favicon/favicon.png',
          },
          {
            rel: 'apple-touch-icon',
            href: '/assets/favicon/favicon.png',
            sizes: '144x144',
          },
        ]}
      />
      <Head>
        <meta name="theme-color" content="#0135DB" />
        <meta name="viewport" content="width=device-width,user-scalable=no" />
      </Head>
      <NotificationProvider>
        <PortalProvider>
          <DialogProvider>
            <AnimateSharedLayout type="crossfade">
              <Main>
                <Component {...pageProps} />
              </Main>
            </AnimateSharedLayout>
          </DialogProvider>
        </PortalProvider>
      </NotificationProvider>
    </>
  );
}
export default MyApp;
