"use client"

import { useState, useRef } from "react"

interface ClothesItem {
  id: number
  label: string
  group: string
}

const CLOTHES: ClothesItem[] = [
  { id: 1, label: "男装 1", group: "男装" },
  { id: 2, label: "男装 2", group: "男装" },
  { id: 3, label: "男装 3", group: "男装" },
  { id: 4, label: "男装 4", group: "男装" },
  { id: 5, label: "男装 5", group: "男装" },
  { id: 6, label: "男装 6", group: "男装" },
  { id: 7, label: "男装 7", group: "男装" },
  { id: 8, label: "男装 8", group: "男装" },
  { id: 9, label: "男装 9", group: "男装" },
  { id: 10, label: "男装 10", group: "男装" },
  { id: 11, label: "男装 11", group: "男装" },
  { id: 12, label: "男装 12", group: "男装" },
  { id: 13, label: "男装 13", group: "男装" },
  { id: 14, label: "男装 14", group: "男装" },
  { id: 15, label: "男装 15", group: "男装" },
  { id: 16, label: "男装 16", group: "男装" },
  { id: 17, label: "女装 17", group: "女装" },
  { id: 18, label: "女装 18", group: "女装" },
  { id: 19, label: "女装 19", group: "女装" },
  { id: 20, label: "女装 20", group: "女装" },
  { id: 21, label: "女装 21", group: "女装" },
  { id: 22, label: "女装 22", group: "女装" },
  { id: 23, label: "女装 23", group: "女装" },
  { id: 24, label: "女装 24", group: "女装" },
  { id: 25, label: "女装 25", group: "女装" },
  { id: 26, label: "女装 26", group: "女装" },
  { id: 27, label: "女装 27", group: "女装" },
  { id: 28, label: "女装 28", group: "女装" },
  { id: 29, label: "女装 29", group: "女装" },
  { id: 30, label: "女装 30", group: "女装" },
  { id: 31, label: "女装 31", group: "女装" },
  { id: 32, label: "女装 32", group: "女装" },
  { id: 33, label: "童装 33", group: "童装" },
  { id: 34, label: "童装 34", group: "童装" },
  { id: 35, label: "童装 35", group: "童装" },
  { id: 36, label: "童装 36", group: "童装" },
  { id: 37, label: "童装 37", group: "童装" },
  { id: 38, label: "童装 38", group: "童装" },
  { id: 39, label: "童装 39", group: "童装" },
  { id: 40, label: "童装 40", group: "童装" },
  { id: 41, label: "童装 41", group: "童装" },
  { id: 42, label: "童装 42", group: "童装" },
  { id: 43, label: "童装 43", group: "童装" },
  { id: 44, label: "童装 44", group: "童装" },
  { id: 45, label: "童装 45", group: "童装" },
  { id: 46, label: "童装 46", group: "童装" },
  { id: 47, label: "童装 47", group: "童装" },
  { id: 48, label: "童装 48", group: "童装" },
]

const BG_COLORS = [
  { label: "白色", value: "white", hex: "#FFFFFF" },
  { label: "红色", value: "red", hex: "#FF0000" },
  { label: "深红", value: "dark_red", hex: "#990000" },
  { label: "蓝色", value: "blue", hex: "#0066FF" },
  { label: "浅蓝", value: "tint", hex: "#4DB8FF" },
  { label: "深蓝", value: "dark_blue", hex: "#003399" },
  { label: "灰色", value: "gray", hex: "#999999" },
  { label: "渐变蓝", value: "#3492C4,#ffffff", hex: "linear-gradient(180deg, #3492C4, #ffffff)" },
  { label: "渐变灰", value: "#9c9c9c,#f9f9f9", hex: "linear-gradient(180deg, #9c9c9c, #f9f9f9)" },
]

export default function IdPhotoTest() {
  const [clothesId, setClothesId] = useState(1)
  const [bgColor, setBgColor] = useState("white")
  const [fileFormat, setFileFormat] = useState("jpg")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [idphotoPreview, setIdphotoPreview] = useState<string | null>(null)
  const [idphotoImgName, setIdphotoImgName] = useState<string | null>(null)
  const [idphotoDownloadUrl, setIdphotoDownloadUrl] = useState<string | null>(null)
  const [resultPreview, setResultPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [creating, setCreating] = useState(false)
  const [changing, setChanging] = useState(false)
  const [error, setError] = useState("")
  const [step1Error, setStep1Error] = useState("")
  const [step2Error, setStep2Error] = useState("")
  const [manualImgName, setManualImgName] = useState("")
  const [manualDownloadType, setManualDownloadType] = useState<"make" | "change_clothes">("change_clothes")
  const [downloadResult, setDownloadResult] = useState<string | null>(null)
  const [downloadImageUrl, setDownloadImageUrl] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [manualDownloadUrl, setManualDownloadUrl] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const selectedClothes = CLOTHES.find((c) => c.id === clothesId)

  function handleFileChange() {
    const file = fileRef.current?.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
      setIdphotoPreview(null)
      setIdphotoImgName(null)
      setIdphotoDownloadUrl(null)
      setResultPreview(null)
      setResult(null)
      setStep1Error("")
      setStep2Error("")
    } else {
      setPhotoPreview(null)
    }
  }

  async function handleCreateIdPhoto() {
    if (!fileRef.current?.files?.[0]) return setError("请上传照片")

    setError("")
    setStep1Error("")
    setCreating(true)
    setIdphotoPreview(null)
    setIdphotoImgName(null)
    setResultPreview(null)
    setResult(null)

    try {
      const file = fileRef.current.files[0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("color", bgColor)
      formData.append("filetype", fileFormat)

      const res = await fetch("/api/create-idphoto", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (data.code !== 0) {
        setStep1Error(`制作失败：${data.error || data.msg || JSON.stringify(data)}`)
        return
      }

      setIdphotoImgName(data.img_name)
      setIdphotoDownloadUrl(data.download_url)
      if (data.image) {
        setIdphotoPreview(`data:image/${fileFormat};base64,${data.image}`)
      }
    } catch (err) {
      setStep1Error(String(err))
    } finally {
      setCreating(false)
    }
  }

  async function handleChangeClothes() {
    if (!idphotoImgName) return setError("请先制作证件照")

    setError("")
    setStep2Error("")
    setChanging(true)
    setResultPreview(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("img_name", idphotoImgName)
      formData.append("clothes_id", String(clothesId))
      formData.append("color", bgColor)
      formData.append("filetype", fileFormat)

      const res = await fetch("/api/change-clothes", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setResult(data)

      if (data.code === 0 && data.image) {
        setResultPreview(`data:image/${fileFormat};base64,${data.image}`)
      } else {
        setStep2Error(`换装失败：${data.error || data.msg || JSON.stringify(data)}`)
      }
    } catch (err) {
      setStep2Error(String(err))
    } finally {
      setChanging(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        可立图 ClipImg 证件照换装测试
      </h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
        两步流程：1. 制作证件照（免费）→ 2. 换装（免费预览，下载扣 30 点）
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Global error */}
        {error && (
          <div style={{
            borderRadius: 6, border: "1px solid #fecaca",
            backgroundColor: "#fef2f2", padding: "12px 16px",
            fontSize: 14, color: "#b91c1c",
          }}>
            {error}
          </div>
        )}

        {/* Photo upload + preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
              上传照片
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
              支持生活照、自拍照，AI 自动抠图
            </p>
          </div>
          {photoPreview && (
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
                原始照片
              </label>
              <img
                src={photoPreview}
                alt="原始照片"
                style={{
                  maxWidth: "100%", maxHeight: 200, borderRadius: 6,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          )}
        </div>

        {/* Background + Format */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
              背景色
            </label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {BG_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setBgColor(c.value)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    padding: 4, borderRadius: 6, cursor: "pointer", minWidth: 60,
                    border: bgColor === c.value ? "2px solid #2563eb" : "1px solid #d0d5dd",
                    backgroundColor: "#fff",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 4, marginBottom: 4,
                    background: c.hex,
                    border: "1px solid #e5e7eb",
                  }} />
                  <span style={{ fontSize: 11, color: "#374151" }}>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
              输出格式
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {["jpg", "png"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFileFormat(f)}
                  style={{
                    padding: "6px 16px", borderRadius: 6, fontSize: 14, fontWeight: 500,
                    border: fileFormat === f ? "none" : "1px solid #d0d5dd",
                    backgroundColor: fileFormat === f ? "#2563eb" : "#fff",
                    color: fileFormat === f ? "#fff" : "#000", cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1 button */}
        <button
          onClick={handleCreateIdPhoto}
          disabled={creating}
          style={{
            padding: "10px 24px", fontSize: 15, fontWeight: 600, borderRadius: 6,
            border: "none", backgroundColor: creating ? "#93c5fd" : "#2563eb",
            color: "#fff", cursor: creating ? "not-allowed" : "pointer", alignSelf: "flex-start",
          }}
        >
          {creating ? "正在制作证件照..." : "步骤 1：制作证件照"}
        </button>

        {/* Step 1 error */}
        {step1Error && (
          <div style={{
            borderRadius: 6, border: "1px solid #fecaca",
            backgroundColor: "#fef2f2", padding: "12px 16px",
            fontSize: 14, color: "#b91c1c",
          }}>
            {step1Error}
          </div>
        )}

        {/* ID Photo result */}
            {idphotoPreview && (
          <div style={{
            borderRadius: 6, border: "2px solid #22c55e", padding: 16,
            backgroundColor: "#f0fdf4",
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#166534" }}>
              步骤 1 完成：证件照制作成功
            </h2>
            <img
              src={idphotoPreview}
              alt="证件照"
              style={{ maxHeight: 300, width: "auto", borderRadius: 6 }}
            />
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8, wordBreak: "break-all" }}>
              img_name: {idphotoImgName}
            </p>
            <button
              onClick={async () => {
                if (!idphotoDownloadUrl) return
                try {
                  const res = await fetch("/api/download", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ download_url: idphotoDownloadUrl }),
                  })
                  if (res.ok) {
                    const blob = await res.blob()
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `idphoto.${fileFormat}`
                    link.click()
                    URL.revokeObjectURL(url)
                  } else {
                    const text = await res.text()
                    alert(`下载失败 (${res.status}): ${text}`)
                  }
                } catch (err) {
                  alert("下载出错：" + err)
                }
              }}
              style={{
                marginTop: 8, padding: "6px 12px", borderRadius: 6, fontSize: 12,
                border: "1px solid #d0d5dd", backgroundColor: "#fff", cursor: "pointer",
              }}
            >
              测试：下载证件照无水印原图
            </button>
          </div>
        )}

        {/* Step 2 section - only show after step 1 */}
        {idphotoImgName && (
          <>
            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />

            {/* Clothing selector - grid display */}
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
                选择服装
              </label>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                {["男装", "女装", "童装"].map((group) => {
                  const isActive = selectedClothes?.group === group
                  const count = CLOTHES.filter((c) => c.group === group).length
                  return (
                    <button
                      key={group}
                      onClick={() => {
                        const first = CLOTHES.find((c) => c.group === group)
                        if (first) setClothesId(first.id)
                      }}
                      style={{
                        padding: "6px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                        border: isActive ? "2px solid #2563eb" : "1px solid #d0d5dd",
                        backgroundColor: isActive ? "#eff6ff" : "#fff",
                        color: isActive ? "#2563eb" : "#374151",
                        cursor: "pointer",
                      }}
                    >
                      {group} ({count})
                    </button>
                  )
                })}
              </div>

              {/* Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                gap: 8,
                maxHeight: 400,
                overflowY: "auto",
                padding: 4,
              }}>
                {CLOTHES.filter((c) => c.group === selectedClothes?.group).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setClothesId(c.id)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      padding: 4, borderRadius: 6, cursor: "pointer",
                      border: clothesId === c.id ? "2px solid #2563eb" : "1px solid #e5e7eb",
                      backgroundColor: clothesId === c.id ? "#eff6ff" : "#fff",
                      transition: "all 0.15s",
                    }}
                  >
                    <img
                      src={`/clothes/${c.group}/${c.id}.jpg`}
                      alt={c.label}
                      style={{
                        width: 64, height: 64, objectFit: "contain",
                        borderRadius: 4,
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                    <span style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                      {c.id}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected info */}
              {selectedClothes && (
                <div style={{
                  marginTop: 8, padding: "8px 12px", borderRadius: 6,
                  backgroundColor: "#eff6ff", fontSize: 13, color: "#2563eb",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  <span>已选择：</span>
                  <strong>{selectedClothes.label}</strong>
                  <span style={{ color: "#6b7280", fontSize: 12 }}>（{selectedClothes.group}，ID: {clothesId}）</span>
                </div>
              )}
            </div>

            {/* Step 2 button */}
            <button
              onClick={handleChangeClothes}
              disabled={changing}
              style={{
                padding: "10px 24px", fontSize: 15, fontWeight: 600, borderRadius: 6,
                border: "none", backgroundColor: changing ? "#93c5fd" : "#16a34a",
                color: "#fff", cursor: changing ? "not-allowed" : "pointer", alignSelf: "flex-start",
              }}
            >
              {changing ? "正在换装..." : "步骤 2：换装"}
            </button>

            {/* Step 2 error */}
            {step2Error && (
              <div style={{
                borderRadius: 6, border: "1px solid #fecaca",
                backgroundColor: "#fef2f2", padding: "12px 16px",
                fontSize: 14, color: "#b91c1c",
              }}>
                {step2Error}
              </div>
            )}
          </>
        )}

        {/* Result preview */}
        {resultPreview && (
          <div style={{
            borderRadius: 6, border: "1px solid #d0d5dd", padding: 16,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>换装结果预览</h2>
            <img
              src={resultPreview}
              alt="换装结果"
              style={{ maxHeight: 500, width: "auto", borderRadius: 6, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
            />
            <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
              <button
                onClick={() => {
                  const link = document.createElement("a")
                  link.href = resultPreview
                  link.download = `idphoto_clothes.${fileFormat}`
                  link.click()
                }}
                style={{
                  padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                  border: "1px solid #d0d5dd", backgroundColor: "#fff",
                  cursor: "pointer", color: "#374151",
                }}
              >
                保存预览图（有水印）
              </button>
              <button
                onClick={async () => {
                  if (!result?.download_url) return
                  try {
                    const res = await fetch("/api/download", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ download_url: result.download_url }),
                    })
                    if (!res.ok) {
                      const text = await res.text()
                      alert(`下载失败 (${res.status})：${text}`)
                      return
                    }
                    const blob = await res.blob()
                    const url = URL.createObjectURL(blob)
                    const link = document.createElement("a")
                    link.href = url
                    link.download = `idphoto_clothes_nw.${fileFormat}`
                    link.click()
                    URL.revokeObjectURL(url)
                  } catch (err) {
                    alert("下载出错：" + err)
                  }
                }}
                style={{
                  padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 500,
                  border: "none", backgroundColor: "#2563eb",
                  cursor: "pointer", color: "#fff",
                }}
              >
                下载无水印原图（扣 30 点）
              </button>
            </div>
          </div>
        )}

        {/* JSON response */}
        {result && (
          <div style={{
            borderRadius: 6, border: "1px solid #d0d5dd",
            backgroundColor: "#f9fafb", padding: 16,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>API 响应</h2>
            <pre style={{
              overflowX: "auto", fontSize: 12, color: "#374151", margin: 0, whiteSpace: "pre-wrap",
            }}>
              {JSON.stringify(result, null, 2).replace(/"image":\s*"[^"]*"/g, '"image": "[base64 image data]"')}
            </pre>
          </div>
        )}

        {/* Manual download test */}
        <hr style={{ border: "none", borderTop: "2px solid #f59e0b" }} />
        <div style={{
          borderRadius: 6, border: "1px solid #f59e0b", padding: 16,
          backgroundColor: "#fffbeb",
        }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: "#92400e" }}>
            调试：手动输入 download_url 测试下载
          </h2>
          <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
            粘贴从 API 响应中复制的 download_url，相同的 url 不重复扣费
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              value={manualDownloadUrl}
              onChange={(e) => setManualDownloadUrl(e.target.value)}
              placeholder="粘贴 download_url..."
              style={{
                flex: 1, padding: "8px 12px", fontSize: 13, fontFamily: "monospace",
                borderRadius: 6, border: "1px solid #d0d5dd",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={async () => {
                if (!manualDownloadUrl) {
                  alert("请填写 download_url")
                  return
                }
                setDownloading(true)
                setDownloadResult(null)
                setDownloadImageUrl(null)
                try {
                  const res = await fetch("/api/download", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ download_url: manualDownloadUrl }),
                  })
                  const ct = res.headers.get("Content-Type") || ""
                  if (res.ok && ct.includes("image")) {
                    const blob = await res.blob()
                    const url = URL.createObjectURL(blob)
                    setDownloadImageUrl(url)
                    setDownloadResult(`✅ 成功！大小: ${blob.size} bytes, 类型: ${ct}`)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = `download_${Date.now()}.jpg`
                    a.click()
                  } else {
                    const text = await res.text()
                    setDownloadResult(`状态: ${res.status}\nContent-Type: ${ct}\n大小: ${text.length} bytes\n\n${text.slice(0, 500)}`)
                  }
                } catch (err) {
                  setDownloadResult("出错: " + String(err))
                } finally {
                  setDownloading(false)
                }
              }}
              disabled={downloading}
              style={{
                padding: "8px 16px", fontSize: 13, fontWeight: 500, borderRadius: 6,
                border: "none", backgroundColor: "#f59e0b", color: "#fff",
                cursor: downloading ? "not-allowed" : "pointer",
              }}
            >
              {downloading ? "测试中..." : "测试下载"}
            </button>
          </div>
          {downloadImageUrl && (
            <div style={{ marginTop: 8 }}>
              <img src={downloadImageUrl} alt="下载结果" style={{ maxHeight: 300, borderRadius: 6, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }} />
              <div style={{ marginTop: 4 }}>
                <button
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = downloadImageUrl
                    a.download = `${manualDownloadType}_${Date.now()}.jpg`
                    a.click()
                  }}
                  style={{
                    padding: "6px 12px", borderRadius: 6, fontSize: 12,
                    border: "none", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer",
                  }}
                >
                  再次下载到本地
                </button>
              </div>
            </div>
          )}
          {downloadResult && (
            <pre style={{
              marginTop: 8, padding: 8, borderRadius: 4, fontSize: 12,
              backgroundColor: "#fefce8", color: "#713f12", overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}>
              {downloadResult}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
