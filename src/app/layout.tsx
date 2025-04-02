import type { Metadata } from 'next';
// Paso 1. importo fuente 
import { Doto } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gestor financiero',
  description: 'Aplicación para rasterar tus finanzas',
};

// Paso 2. Configuro la importacion
const doto = Doto({
  variable: '--font-doto',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang='en'>
      <body className={`${doto.variable} antialiased`}>{children}</body>
    </html>
  );
  // Paso 3. Hago los respectivos cambios al body
}
