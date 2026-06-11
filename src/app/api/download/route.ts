import { NextRequest, NextResponse } from "next/server"

const API_KEY = "8hR2krd8tyKBPQDDGju6tDzovnlioJLk"

export async function POST(req: NextRequest) {
  try {
    const { download_url } = await req.json()

    if (!download_url) {
      return NextResponse.json({ error: "download_url is required" }, { status: 400 })
    }

    const res = await fetch(download_url, {
      method: "POST",
      headers: { "X-API-Key": API_KEY },
    })

    const buffer = await res.arrayBuffer()

    if (!res.ok) {
      const text = new TextDecoder().decode(buffer)
      return new Response(text || "Download failed", { status: res.status })
    }

    const contentType = res.headers.get("Content-Type") || "image/jpeg"

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="idphoto.jpg"`,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
