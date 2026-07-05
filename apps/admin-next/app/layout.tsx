import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Admin IMPERIO 1",
  description: "Panel Next.js para revisar disponibilidad de Apartamento IMPERIO 1"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
