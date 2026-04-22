import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#667eea" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="https://telegram.org/js/telegram-web-app.js" async></script>
      </body>
    </Html>
  );
}
