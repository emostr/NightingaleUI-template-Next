import './globals.css'
import { ThemeProvider } from '@/lib/theme'

export const metadata = {
  title: {
    default: 'NightingaleUI — Admin',
    template: '%s · NightingaleUI',
  },
  description: 'NightingaleUI admin panel template',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2300B294'/%3E%3Crect x='8' y='8' width='16' height='16' fill='%230a0a0a'/%3E%3C/svg%3E",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const themeScript = `(function(){try{var t=localStorage.getItem('ng-theme')||'dark';var a=localStorage.getItem('ng-accent')||'teal';var e=document.documentElement;e.setAttribute('data-theme',t);e.setAttribute('data-accent',a);}catch(e){}})();`

export default function RootLayout({ children }) {
  return (
    <html lang="ru" data-theme="dark" data-accent="teal" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
