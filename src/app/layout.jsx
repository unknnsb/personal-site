import '../index.css';
import ClientLayout from '../components/ClientLayout';
import MusicPlayer from '../components/MusicPlayer';

export const metadata = {
  title: {
    default: 'nesbeer',
    template: '%s | nesbeer',
  },
  description: 'from kerala. currently studying. into code, editing, and series. obsessed with film.',
  openGraph: {
    title: 'nesbeer',
    description: 'from kerala. currently studying. into code, editing, and series. obsessed with film.',
    siteName: 'nesbeer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nesbeer',
    description: 'from kerala. currently studying. into code, editing, and series. obsessed with film.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <ClientLayout>
            <main className="app-main">{children}</main>
          </ClientLayout>
          <MusicPlayer />
        </div>
      </body>
    </html>
  );
}
