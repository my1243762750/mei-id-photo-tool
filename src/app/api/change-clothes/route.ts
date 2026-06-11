import { NextRequest, NextResponse } from "next/server"

import { CLIPIMG_API_KEY } from "../../../lib/config"

const CLIPIMG_API = "https://www.clipimg.com/api/idphoto/change_clothes"

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
    const formData = await req.formData()
    const imgName = formData.get("img_name") as string
    const clothesId = formData.get("clothes_id") as string
    const color = formData.get("color") as string || "white"
    const filetype = formData.get("filetype") as string || "jpg"

    if (!imgName || !clothesId) {
      return NextResponse.json({ error: "img_name and clothes_id are required" }, { status: 400 })
    }

    let bgColorValue = "#FFFFFF"
    let encColorValue = ""

    if (color.includes(",")) {
      const parts = color.split(",")
      bgColorValue = parts[0].trim()
      encColorValue = parts[1].trim()
    } else {
      bgColorValue = COLOR_MAP[color] || (color.startsWith("#") ? color : `#${color}`) || "#FFFFFF"
    }

    const payload: Record<string, any> = {
      img_name: imgName,
      clothes_id: parseInt(clothesId, 10),
      bg_color: bgColorValue,
      file_format: filetype === "png" ? 0 : 1,
    }

    if (encColorValue) {
      payload.enc_color = encColorValue
    }

    const clipRes = await fetch(CLIPIMG_API, {
      method: "POST",
      headers: {
        "X-API-Key": CLIPIMG_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const data = await clipRes.json()

    if (data.code !== 0) {
      return NextResponse.json({ error: data.msg || "换装失败" }, { status: 400 })
    }

    const previewRes = await fetch(data.data.preview_url)
    const previewBuffer = await previewRes.arrayBuffer()
    const previewBase64 = Buffer.from(previewBuffer).toString("base64")

    return NextResponse.json({
      code: 0,
      image: previewBase64,
      img_name: data.data.img_name,
      download_url: data.data.download_url,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
