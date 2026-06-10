import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mei ID Photo Tool",
  description: "ClipImg change_clothes API test tool",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  )
}
