import '../styles/globals.css'
import '../styles/output.css'
import '../styles/code-dark.css'
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider defaultTheme='dark' attribute='class'>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
};

export default MyApp;
