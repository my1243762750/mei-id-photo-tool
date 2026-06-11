import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // Read API Key from custom header, fallback to system environment variable
    const userApiKey = req.headers.get("x-api-key") || process.env.CLIPIMG_API_KEY

    if (!userApiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 401 })
    }

    const { download_url } = await req.json()

    if (!download_url) {
      return NextResponse.json({ error: "download_url is required" }, { status: 400 })
    }

    const res = await fetch(download_url, {
      method: "POST",
      headers: { "X-API-Key": userApiKey },
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
