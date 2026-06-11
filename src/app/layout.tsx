import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mei ID Photo Tool",
  description: "ClipImg change_clothes API test tool",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
