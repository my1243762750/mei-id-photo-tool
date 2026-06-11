import { NextRequest, NextResponse } from "next/server"

const CLIPIMG_API = "https://www.clipimg.com/api/idphoto/make"

const COLOR_MAP: Record<string, string> = {
  white: "#FFFFFF",
  red: "#FF0000",
  dark_red: "#CC0000",
  blue: "#438EDB",
  tint: "#4DB8FF",
  dark_blue: "#003399",
  gray: "#999999",
}

export async function POST(req: NextRequest) {
  try {
    // Read API Key from custom header, fallback to system environment variable
    const userApiKey = req.headers.get("x-api-key") || process.env.CLIPIMG_API_KEY

    if (!userApiKey) {
      return NextResponse.json({ error: "API Key not configured. Please set it in Settings." }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const color = formData.get("color") as string || "white"
    const filetype = formData.get("filetype") as string || "jpg"

    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    let hexColor = COLOR_MAP[color]
    if (!hexColor) {
      if (color.includes(",")) {
        hexColor = color.split(",")[0].trim()
      } else {
        hexColor = color.startsWith("#") ? color : `#${color}`
      }
    }

    const colorName = COLOR_MAP[color] ? color : "custom"

    const payload: Record<string, any> = {
      file: base64,
      width: 295,
      height: 413,
      color: [{ name: colorName, start_color: hexColor }],
      file_format: filetype === "png" ? 0 : 1,
      dpi: 300,
    }

    const clipRes = await fetch(CLIPIMG_API, {
      method: "POST",
      headers: {
        "X-API-Key": userApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await clipRes.json()

    if (data.code !== 0) {
      return NextResponse.json({ error: data.msg || "制作失败" }, { status: 400 })
    }

    const item = data.data.filenames?.[0]
    if (!item) {
      return NextResponse.json({ error: "制作结果为空" }, { status: 500 })
    }

    const previewRes = await fetch(item.preview_url)
    const previewBuffer = await previewRes.arrayBuffer()
    const previewBase64 = Buffer.from(previewBuffer).toString("base64")

    return NextResponse.json({
      code: 0,
      image: previewBase64,
      img_name: item.img_name,
      download_url: item.download_url,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
