import { NextRequest, NextResponse } from "next/server"

const DIANZIZHAO_API = "https://www.dianzizhao.com/api/open/idphoto"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const apiKey = formData.get("apiKey") as string
    const file = formData.get("file") as File | null
    const color = formData.get("color") as string
    const filetype = formData.get("filetype") as string

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is required" }, { status: 400 })
    }

    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 })
    }

    const remoteFormData = new FormData()
    remoteFormData.append("file", file)
    remoteFormData.append("width", "295")
    remoteFormData.append("height", "413")
    if (color) remoteFormData.append("color", color)
    if (filetype) remoteFormData.append("filetype", filetype)

    const clipRes = await fetch(`${DIANZIZHAO_API}?type=preview`, {
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
