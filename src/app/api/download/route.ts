import { NextRequest } from "next/server"

const DIANZIZHAO_HOST = "https://www.dianzizhao.com"

async function proxyDownload(url: string, apiKey: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: { "X-API-Key": apiKey },
  })
  const buffer = await res.arrayBuffer()

  const headers: Record<string, string> = {}
  res.headers.forEach((v, k) => { headers[k] = v })
  console.log("[download] response headers:", JSON.stringify(headers))

  const contentType = res.headers.get("Content-Type") || ""
  console.log("[download] status:", res.status, "content-type:", contentType, "received bytes:", buffer.byteLength)

  if (!res.ok) {
    const text = new TextDecoder().decode(buffer)
    return new Response(text || "error", { status: res.status, headers: { "Content-Type": contentType || "application/json" } })
  }

  if (buffer.byteLength === 0) {
    return new Response(JSON.stringify({
      error: "API returned empty response (tried browser headers + minimal headers)",
      response_headers: headers,
    }), { status: 502, headers: { "Content-Type": "application/json" } })
  }

  if (contentType.includes("image")) {
    return new Response(buffer, {
      headers: { "Content-Type": contentType, "Content-Disposition": `attachment; filename="idphoto.jpg"` },
    })
  }

  const text = new TextDecoder().decode(buffer)
  return new Response(text, { headers: { "Content-Type": contentType || "application/json" } })
}

export async function GET(req: NextRequest) {
  const photoid = req.nextUrl.searchParams.get("photoid")
  const apiKey = req.nextUrl.searchParams.get("apiKey")
  const downloadType = req.nextUrl.searchParams.get("type") || "clothes"

  if (!photoid || !apiKey) {
    return new Response(JSON.stringify({ error: "photoid and apiKey are required" }), {
      status: 400, headers: { "Content-Type": "application/json" },
    })
  }

  const baseEndpoint = downloadType === "idphoto"
    ? "/api/open/idphoto/download"
    : "/api/open/changeclothes/download"

  const url = `${DIANZIZHAO_HOST}${baseEndpoint}?photoid=${encodeURIComponent(photoid)}`

  return proxyDownload(url, apiKey)
}
