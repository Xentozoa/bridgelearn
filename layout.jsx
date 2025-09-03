import { Libre_Baskerville, Josefin_Sans } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

// Configure your fonts with the Next.js Font API
const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-libre',
});

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-josefin',
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${josefinSans.variable}`}>
      <body>
        <Navbar />
        <div className="content-container">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
