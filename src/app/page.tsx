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
  { id: 101, label: "男装 101", group: "男装" },
  { id: 102, label: "男装 102", group: "男装" },
  { id: 103, label: "男装 103", group: "男装" },
  { id: 104, label: "男装 104", group: "男装" },
  { id: 105, label: "男装 105", group: "男装" },
  { id: 106, label: "男装 106", group: "男装" },
  { id: 107, label: "男装 107", group: "男装" },
  { id: 108, label: "男装 108", group: "男装" },
  { id: 109, label: "男装 109", group: "男装" },
  { id: 110, label: "男装 110", group: "男装" },
  { id: 111, label: "男装 111", group: "男装" },
  { id: 112, label: "男装 112", group: "男装" },
  { id: 113, label: "男装 113", group: "男装" },
  { id: 114, label: "男装 114", group: "男装" },
  { id: 115, label: "男装 115", group: "男装" },
  { id: 116, label: "男装 116", group: "男装" },
  { id: 117, label: "男装 117", group: "男装" },
  { id: 118, label: "男装 118", group: "男装" },
  { id: 119, label: "男装 119", group: "男装" },
  { id: 120, label: "男装 120", group: "男装" },
  { id: 121, label: "男装 121", group: "男装" },
  { id: 122, label: "男装 122", group: "男装" },
  { id: 123, label: "男装 123", group: "男装" },
  { id: 16, label: "女装 16", group: "女装" },
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
  { id: 50, label: "女装 50", group: "女装" },
  { id: 51, label: "女装 51", group: "女装" },
  { id: 52, label: "女装 52", group: "女装" },
  { id: 53, label: "女装 53", group: "女装" },
  { id: 54, label: "女装 54", group: "女装" },
  { id: 55, label: "女装 55", group: "女装" },
  { id: 56, label: "女装 56", group: "女装" },
  { id: 57, label: "女装 57", group: "女装" },
  { id: 58, label: "女装 58", group: "女装" },
  { id: 59, label: "女装 59", group: "女装" },
  { id: 60, label: "女装 60", group: "女装" },
  { id: 61, label: "女装 61", group: "女装" },
  { id: 62, label: "女装 62", group: "女装" },
  { id: 63, label: "女装 63", group: "女装" },
  { id: 64, label: "女装 64", group: "女装" },
  { id: 65, label: "女装 65", group: "女装" },
  { id: 66, label: "女装 66", group: "女装" },
  { id: 67, label: "女装 67", group: "女装" },
  { id: 68, label: "女装 68", group: "女装" },
  { id: 69, label: "女装 69", group: "女装" },
  { id: 70, label: "女装 70", group: "女装" },
  { id: 71, label: "女装 71", group: "女装" },
  { id: 72, label: "女装 72", group: "女装" },
  { id: 73, label: "女装 73", group: "女装" },
  { id: 77, label: "女装 77", group: "女装" },
  { id: 78, label: "女装 78", group: "女装" },
  { id: 79, label: "女装 79", group: "女装" },
  { id: 80, label: "女装 80", group: "女装" },
  { id: 81, label: "女装 81", group: "女装" },
  { id: 82, label: "女装 82", group: "女装" },
  { id: 83, label: "女装 83", group: "女装" },
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
  { id: 201, label: "童装 201", group: "童装" },
  { id: 202, label: "童装 202", group: "童装" },
  { id: 203, label: "童装 203", group: "童装" },
  { id: 204, label: "童装 204", group: "童装" },
  { id: 205, label: "童装 205", group: "童装" },
  { id: 206, label: "童装 206", group: "童装" },
  { id: 207, label: "童装 207", group: "童装" },
  { id: 208, label: "童装 208", group: "童装" },
  { id: 209, label: "童装 209", group: "童装" },
  { id: 210, label: "童装 210", group: "童装" },
]

const BG_COLORS = [
  { label: "白色", value: "white" },
  { label: "红色", value: "red" },
  { label: "深红", value: "dark_red" },
  { label: "蓝色", value: "blue" },
  { label: "浅蓝", value: "tint" },
  { label: "深蓝", value: "dark_blue" },
  { label: "灰色", value: "gray" },
]

export default function IdPhotoTest() {
  const [apiKey, setApiKey] = useState("")
  const [clothesId, setClothesId] = useState(1)
  const [bgColor, setBgColor] = useState("white")
  const [fileFormat, setFileFormat] = useState("jpg")
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [idphotoPreview, setIdphotoPreview] = useState<string | null>(null)
  const [idphotoPhotoid, setIdphotoPhotoid] = useState<string | null>(null)
  const [resultPreview, setResultPreview] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [step, setStep] = useState<"idle" | "creating" | "changing">("idle")
  const [error, setError] = useState("")
  const [stepLog, setStepLog] = useState<string[]>([])
  const fileRef = useRef<HTMLInputElement>(null)

  const selectedClothes = CLOTHES.find((c) => c.id === clothesId)

  function addLog(msg: string) {
    setStepLog((prev) => [...prev, msg])
  }

  function handleFileChange() {
    const file = fileRef.current?.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
      setIdphotoPreview(null)
      setIdphotoPhotoid(null)
      setResultPreview(null)
      setResult(null)
      setStepLog([])
    } else {
      setPhotoPreview(null)
    }
  }

  async function handleSubmit() {
    if (!apiKey) return setError("请输入 API Key")
    if (!fileRef.current?.files?.[0]) return setError("请上传照片")

    setError("")
    setStep("creating")
    setResult(null)
    setResultPreview(null)
    setStepLog([])

    try {
      const file = fileRef.current.files[0]

      addLog("步骤 1/2：正在制作证件照...")

      const step1Form = new FormData()
      step1Form.append("apiKey", apiKey)
      step1Form.append("file", file)
      step1Form.append("color", bgColor)
      step1Form.append("filetype", fileFormat)

      const step1Res = await fetch("/api/create-idphoto", {
        method: "POST",
        body: step1Form,
      })

      const step1Data = await step1Res.json()

      if (step1Data.code !== 0) {
        setError(`步骤 1 失败：${step1Data.msg || JSON.stringify(step1Data)}`)
        setStep("idle")
        return
      }

      const photoid = step1Data.photoid
      setIdphotoPhotoid(photoid)

      if (step1Data.image) {
        const imgSrc = `data:image/${fileFormat};base64,${step1Data.image}`
        setIdphotoPreview(imgSrc)
      }

      addLog(`步骤 1 完成，获得 photoid: ${photoid.slice(0, 16)}...`)

      setStep("changing")
      addLog("步骤 2/2：正在换装...")

      const step2Form = new FormData()
      step2Form.append("apiKey", apiKey)
      step2Form.append("photoid", photoid)
      step2Form.append("clothes_id", String(clothesId))
      step2Form.append("width", "295")
      step2Form.append("height", "413")
      step2Form.append("color", bgColor)
      step2Form.append("filetype", fileFormat)

      const step2Res = await fetch("/api/change-clothes", {
        method: "POST",
        body: step2Form,
      })

      const step2Data = await step2Res.json()
      setResult(step2Data)

      if (step2Data.code === 0 && step2Data.image) {
        setResultPreview(`data:image/${fileFormat};base64,${step2Data.image}`)
        addLog("步骤 2 完成！")
      } else {
        addLog(`步骤 2 失败：${step2Data.msg || JSON.stringify(step2Data)}`)
      }
    } catch (err) {
      setError(String(err))
    } finally {
      setStep("idle")
    }
  }

  const isLoading = step !== "idle"

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
        电子照助手 证件照换装测试
      </h1>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
        流程：上传照片 → 自动抠图制作证件照 → 换装
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* API Key */}
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="输入你的电子照助手 API Key"
            style={{
              width: "100%", padding: "8px 12px", fontSize: 14,
              borderRadius: 6, border: "1px solid #d0d5dd", boxSizing: "border-box",
            }}
          />
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
            注册 dianzizhao.com 后在个人中心获取，新用户免费赠送 1000 点
          </p>
        </div>

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

        {/* ID Photo preview (after step 1) */}
        {idphotoPreview && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
                步骤 1：证件照（抠图+换底）
              </label>
              <img
                src={idphotoPreview}
                alt="证件照"
                style={{
                  maxWidth: "100%", maxHeight: 200, borderRadius: 6,
                  border: "2px solid #22c55e", boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
        )}

        {/* Clothing selector */}
        <div>
          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
            服装 {selectedClothes?.group && <span style={{ fontSize: 12, color: "#6b7280" }}>（{selectedClothes.group}）</span>}
          </label>
          <select
            value={clothesId}
            onChange={(e) => setClothesId(Number(e.target.value))}
            style={{
              width: "100%", padding: "8px 12px", fontSize: 14,
              borderRadius: 6, border: "1px solid #d0d5dd",
            }}
          >
            <optgroup label="男装">
              {CLOTHES.filter((c) => c.group === "男装").map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </optgroup>
            <optgroup label="女装">
              {CLOTHES.filter((c) => c.group === "女装").map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </optgroup>
            <optgroup label="童装">
              {CLOTHES.filter((c) => c.group === "童装").map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </optgroup>
          </select>

          {selectedClothes && (
            <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
              <img
                src={`/clothes/${selectedClothes.group}/${clothesId}.jpg`}
                alt={selectedClothes.label}
                style={{
                  width: 80, height: 80, objectFit: "contain",
                  borderRadius: 6, border: "1px solid #d0d5dd", backgroundColor: "#f9fafb",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                }}
              />
              <span style={{ fontSize: 13, color: "#374151" }}>{selectedClothes.label}</span>
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
                    padding: "6px 12px", borderRadius: 6, fontSize: 13,
                    border: bgColor === c.value ? "2px solid #2563eb" : "1px solid #d0d5dd",
                    backgroundColor: bgColor === c.value ? "#eff6ff" : "#fff",
                    cursor: "pointer", fontWeight: bgColor === c.value ? 600 : 400,
                  }}
                >
                  {c.label}
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{
            padding: "10px 24px", fontSize: 15, fontWeight: 600, borderRadius: 6,
            border: "none", backgroundColor: isLoading ? "#93c5fd" : "#2563eb",
            color: "#fff", cursor: isLoading ? "not-allowed" : "pointer", alignSelf: "flex-start",
          }}
        >
          {step === "creating" ? "正在制作证件照..." : step === "changing" ? "正在换装..." : "开始处理"}
        </button>

        {/* Error */}
        {error && (
          <div style={{
            borderRadius: 6, border: "1px solid #fecaca",
            backgroundColor: "#fef2f2", padding: "12px 16px",
            fontSize: 14, color: "#b91c1c",
          }}>
            {error}
          </div>
        )}

        {/* Step log */}
        {stepLog.length > 0 && (
          <div style={{
            borderRadius: 6, border: "1px solid #d0d5dd",
            backgroundColor: "#f9fafb", padding: 12, fontSize: 13, color: "#374151",
          }}>
            {stepLog.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
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
            <div style={{ marginTop: 12 }}>
              <span style={{ fontSize: 12, color: "#6b7280" }}>
                注：此为预览图（有水印）。如需下载无水印原图，需调用下载接口并消耗 20 点（约 0.2 元）
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
