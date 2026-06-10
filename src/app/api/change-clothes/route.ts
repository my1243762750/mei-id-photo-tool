import { NextRequest, NextResponse } from "next/server"

const DIANZIZHAO_API = "https://www.dianzizhao.com/api/open/changeclothes"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const apiKey = formData.get("apiKey") as string
    const clothes_id = formData.get("clothes_id") as string
    const width = formData.get("width") as string
    const height = formData.get("height") as string
    const color = formData.get("color") as string
    const filetype = formData.get("filetype") as string

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is required" }, { status: 400 })
    }

    const file = formData.get("file") as File | null
    const picurl = formData.get("picurl") as string | null
    const photoid = formData.get("photoid") as string | null

    if (!file && !picurl && !photoid) {
      return NextResponse.json({ error: "Image file, picurl, or photoid is required" }, { status: 400 })
    }

    const remoteFormData = new FormData()
    if (file) {
      remoteFormData.append("file", file)
    }
    if (picurl) {
      remoteFormData.append("picurl", picurl)
    }
    if (photoid) {
      remoteFormData.append("photoid", photoid)
    }
    remoteFormData.append("clothes_id", clothes_id ?? "1")
    remoteFormData.append("width", width ?? "295")
    remoteFormData.append("height", height ?? "413")
    if (color) remoteFormData.append("color", color)
    if (filetype) remoteFormData.append("filetype", filetype)

    const clipRes = await fetch(DIANZIZHAO_API, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
      },
      body: remoteFormData,
    })

    const data = await clipRes.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
