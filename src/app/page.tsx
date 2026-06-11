"use client"

import { useState, useRef, useEffect } from "react"

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
  { label: "蓝色", value: "blue", hex: "#3B82F6" },
  { label: "浅蓝", value: "tint", hex: "#93C5FD" },
  { label: "红色", value: "red", hex: "#EF4444" },
  { label: "灰色", value: "gray", hex: "#7C7D8A" },
  { label: "蓝白渐变", value: "#3492C4,#ffffff", hex: "linear-gradient(180deg, #3B82F6, #FFFFFF)" },
  { label: "灰白渐变", value: "#9c9c9c,#f9f9f9", hex: "linear-gradient(180deg, #7C7D8A, #F8F9FC)" },
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
  const [resultDownloadUrl, setResultDownloadUrl] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [changing, setChanging] = useState(false)
  
  // Refined Toast State
  const [toast, setToast] = useState<{ msg: string; type: "error" | "info" } | null>(null)
  
  // API Key State
  const [userApiKey, setUserApiKey] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [showKey, setShowKey] = useState(false) // Toggle visibility
  
  // Controller for active display in Hero area
  const [activeDisplay, setActiveDisplay] = useState<"original" | "idphoto" | "result">("original")
  
  const fileRef = useRef<HTMLInputElement>(null)
  const selectedClothes = CLOTHES.find((c) => c.id === clothesId)

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Load API Key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("clipimg_api_key")
    if (savedKey) {
      setUserApiKey(savedKey)
    } else {
      setShowSettings(true)
    }
  }, [])

  function handleSaveApiKey(val: string) {
    setUserApiKey(val)
    localStorage.setItem("clipimg_api_key", val)
  }

  function handleFileChange() {
    const file = fileRef.current?.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
      setIdphotoPreview(null)
      setIdphotoImgName(null)
      setIdphotoDownloadUrl(null)
      setResultPreview(null)
      setResultDownloadUrl(null)
      setActiveDisplay("original")
    } else {
      setPhotoPreview(null)
    }
  }

  async function handleCreateIdPhoto() {
    if (!fileRef.current?.files?.[0]) return setToast({ msg: "请上传一张照片以开始", type: "error" })

    setCreating(true)

    try {
      const file = fileRef.current.files[0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("color", bgColor)
      formData.append("filetype", fileFormat)

      const res = await fetch("/api/create-idphoto", {
        method: "POST",
        headers: { "x-api-key": userApiKey },
        body: formData,
      })

      const data = await res.json()

      if (data.code !== 0) {
        setToast({ msg: `制作失败：${data.error || data.msg}`, type: "error" })
        return
      }

      setIdphotoImgName(data.img_name)
      setIdphotoDownloadUrl(data.download_url)
      if (data.image) {
        setIdphotoPreview(`data:image/${fileFormat};base64,${data.image}`)
        setActiveDisplay("idphoto")
      }
    } catch (err) {
      setToast({ msg: String(err), type: "error" })
    } finally {
      setCreating(false)
    }
  }

  async function handleChangeClothes() {
    if (!idphotoImgName) return setToast({ msg: "请先完成步骤 1", type: "error" })

    setChanging(true)

    try {
      const formData = new FormData()
      formData.append("img_name", idphotoImgName)
      formData.append("clothes_id", String(clothesId))
      formData.append("color", bgColor)
      formData.append("filetype", fileFormat)

      const res = await fetch("/api/change-clothes", {
        method: "POST",
        headers: { "x-api-key": userApiKey },
        body: formData,
      })

      const data = await res.json()

      if (data.code === 0 && data.image) {
        setResultPreview(`data:image/${fileFormat};base64,${data.image}`)
        setResultDownloadUrl(data.download_url)
        setActiveDisplay("result")
      } else {
        setToast({ msg: `换装失败：${data.error || data.msg}`, type: "error" })
      }
    } catch (err) {
      setToast({ msg: String(err), type: "error" })
    } finally {
      setChanging(false)
    }
  }

  const heroImage = 
    activeDisplay === "result" && resultPreview ? resultPreview :
    activeDisplay === "idphoto" && idphotoPreview ? idphotoPreview :
    photoPreview;

  return (
    <div style={{
      maxWidth: 1080,
      margin: "0 auto",
      padding: "var(--mei-spacing-stack-2xl) var(--mei-spacing-inset-lg)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--mei-spacing-stack-2xl)"
    }}>
      <header style={{ textAlign: "center", position: "relative" }}>
        {/* Settings Toggle */}
        <button 
          onClick={() => setShowSettings(!showSettings)}
          style={{
            position: "absolute", top: 0, right: 0,
            padding: "8px 12px", borderRadius: "var(--mei-radius-lg)",
            border: "1px solid var(--mei-border-default)", backgroundColor: "var(--mei-bg-elevated)",
            cursor: "pointer", fontSize: "var(--mei-font-xs)", color: "var(--mei-text-secondary)",
            display: "flex", alignItems: "center", gap: 6,
            transition: "all var(--mei-motion-fast)"
          }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--mei-color-primary-300)"}
          onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--mei-border-default)"}
        >
          {showSettings ? "收起配置" : "API 设置"} ⚙️
        </button>

        <h1 style={{
          fontSize: "var(--mei-font-4xl)",
          fontWeight: "var(--mei-weight-bold)",
          color: "var(--mei-text-primary)",
          marginBottom: "var(--mei-spacing-stack-sm)",
          letterSpacing: "var(--mei-letter-spacing-tight)",
          background: "linear-gradient(135deg, var(--mei-color-primary-500), var(--mei-color-purple-500))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          ClipImg AI 证件照大师
        </h1>
        <p style={{
          fontSize: "var(--mei-font-base)",
          color: "var(--mei-text-secondary)",
          maxWidth: 600,
          margin: "0 auto"
        }}>
          AI 智能抠图、背景切换与专业换装，让生活照秒变正装照。
        </p>
      </header>

      {/* API Settings Card */}
      {showSettings && (
        <section style={{
          backgroundColor: "var(--mei-bg-surface)",
          border: "1px solid var(--mei-color-primary-100)",
          borderRadius: "var(--mei-radius-xl)",
          padding: "var(--mei-spacing-inset-xl)",
          boxShadow: "var(--mei-shadow-sm)",
          animation: "slideDown var(--mei-motion-normal) ease-out"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "var(--mei-spacing-inline-xl)" }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: "block", fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-bold)",
                color: "var(--mei-color-primary-600)", marginBottom: "var(--mei-spacing-stack-sm)",
                textTransform: "uppercase"
              }}>ClipImg API Key</label>
              <div style={{ position: "relative" }}>
                <input 
                  type={showKey ? "text" : "password"}
                  value={userApiKey}
                  onChange={(e) => handleSaveApiKey(e.target.value)}
                  placeholder="在此粘贴你的 32 位 API Key"
                  style={{
                    width: "100%", height: 44, padding: "0 44px 0 var(--mei-spacing-inset-md)",
                    borderRadius: "var(--mei-radius-lg)", border: "1px solid var(--mei-border-default)",
                    fontSize: "var(--mei-font-sm)", backgroundColor: "var(--mei-bg-elevated)",
                    outline: "none", transition: "border-color var(--mei-motion-fast)"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "var(--mei-color-primary-400)"}
                  onBlur={(e) => e.target.style.borderColor = "var(--mei-border-default)"}
                />
                <button 
                  onClick={() => setShowKey(!showKey)}
                  style={{
                    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                    border: "none", backgroundColor: "transparent", cursor: "pointer",
                    display: "flex", alignItems: "center", padding: 8, color: "var(--mei-text-tertiary)"
                  }}
                >
                  {showKey ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  )}
                </button>
              </div>
            </div>
            <div style={{ paddingBottom: 10 }}>
              <a 
                href="https://www.clipimg.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  fontSize: "var(--mei-font-sm)", color: "var(--mei-color-primary-600)",
                  textDecoration: "none", fontWeight: "var(--mei-weight-semibold)",
                  borderBottom: "1px solid var(--mei-color-primary-200)"
                }}
              >
                还没有 Key？官网免费获取 →
              </a>
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "var(--mei-font-xs)", color: "var(--mei-color-success-base)" }}>🛡️ 安全加密</span>
            <span style={{ fontSize: "var(--mei-font-xs)", color: "var(--mei-text-tertiary)" }}>
              你的 Key 仅保存在浏览器本地，预览前两步不消耗余额。
            </span>
          </div>
        </section>
      )}

      {/* Main Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 440px",
        gap: "var(--mei-spacing-inline-xl)",
        alignItems: "start"
      }}>
        
        {/* Left Column: Config */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--mei-spacing-stack-lg)" }}>
          
          {/* Card 1: Upload */}
          <section style={{
            backgroundColor: "var(--mei-bg-elevated)",
            border: "1px solid var(--mei-border-default)",
            borderRadius: "var(--mei-radius-xl)",
            padding: "var(--mei-spacing-inset-xl)",
            boxShadow: "var(--mei-shadow-md)"
          }}>
            <h2 style={{
              fontSize: "var(--mei-font-lg)",
              fontWeight: "var(--mei-weight-semibold)",
              marginBottom: "var(--mei-spacing-stack-lg)",
              display: "flex",
              alignItems: "center",
              gap: "var(--mei-spacing-inline-sm)"
            }}>
              <span style={{ 
                width: 28, height: 28, borderRadius: "var(--mei-radius-full)", 
                backgroundColor: "var(--mei-color-primary-500)", color: "var(--mei-text-inverse)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--mei-font-sm)"
              }}>1</span>
              上传照片
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--mei-spacing-stack-xl)" }}>
              {/* File Input */}
              <div 
                style={{
                  border: "2px dashed " + (photoPreview ? "var(--mei-color-primary-200)" : "var(--mei-border-default)"),
                  borderRadius: "var(--mei-radius-lg)",
                  padding: "var(--mei-spacing-inset-xl)",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor: photoPreview ? "var(--mei-color-primary-50)" : "var(--mei-bg-surface)",
                  transition: "all var(--mei-motion-fast)"
                }} 
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef} type="file" accept="image/*"
                  onChange={handleFileChange} style={{ display: "none" }}
                />
                <div style={{ fontSize: "var(--mei-font-3xl)", marginBottom: "var(--mei-spacing-stack-sm)" }}>
                  {photoPreview ? "✅" : "📸"}
                </div>
                <div style={{ fontSize: "var(--mei-font-sm)", color: "var(--mei-text-primary)", fontWeight: "var(--mei-weight-medium)" }}>
                  {photoPreview ? "照片已就绪" : "点击上传原始照片"}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <label style={{
                  display: "block", fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-bold)",
                  color: "var(--mei-text-tertiary)", textTransform: "uppercase", marginBottom: "var(--mei-spacing-stack-sm)"
                }}>背景色</label>
                <div style={{ display: "flex", gap: "var(--mei-spacing-inline-sm)", flexWrap: "wrap" }}>
                  {BG_COLORS.map((c) => {
                    const isActive = bgColor === c.value
                    return (
                      <button
                        key={c.value} onClick={() => setBgColor(c.value)}
                        style={{
                          width: 40, height: 40, borderRadius: "var(--mei-radius-lg)",
                          background: c.hex, border: isActive ? "3px solid var(--mei-color-primary-500)" : "1px solid var(--mei-border-default)",
                          cursor: "pointer", transition: "all var(--mei-motion-fast)",
                          transform: isActive ? "scale(1.1)" : "scale(1)"
                        }}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Action */}
              <div style={{ display: "flex", gap: "var(--mei-spacing-inline-lg)", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: "block", fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-bold)",
                    color: "var(--mei-text-tertiary)", textTransform: "uppercase", marginBottom: "var(--mei-spacing-stack-sm)"
                  }}>格式</label>
                  <div style={{ display: "flex", gap: 4, backgroundColor: "var(--mei-bg-surface)", padding: 4, borderRadius: "var(--mei-radius-lg)" }}>
                    {["jpg", "png"].map((f) => {
                      const isActive = fileFormat === f
                      return (
                        <button
                          key={f} onClick={() => setFileFormat(f)}
                          style={{
                            flex: 1, padding: "8px 0", border: "none", borderRadius: "var(--mei-radius-md)",
                            fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-bold)", textTransform: "uppercase",
                            backgroundColor: isActive ? "var(--mei-bg-elevated)" : "transparent",
                            color: isActive ? "var(--mei-color-primary-600)" : "var(--mei-text-tertiary)",
                            cursor: "pointer", transition: "all var(--mei-motion-fast)"
                          }}
                        >
                          {f}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <button
                  onClick={handleCreateIdPhoto}
                  disabled={creating || !photoPreview}
                  style={{
                    flex: 1.5, height: 44,
                    borderRadius: "var(--mei-radius-lg)", border: "none",
                    backgroundColor: creating ? "var(--mei-color-primary-300)" : (photoPreview ? "var(--mei-color-primary-500)" : "var(--mei-color-neutral-200)"),
                    color: "var(--mei-text-inverse)", fontWeight: "var(--mei-weight-bold)",
                    cursor: (creating || !photoPreview) ? "not-allowed" : "pointer",
                    boxShadow: (creating || !photoPreview) ? "none" : "var(--mei-shadow-md)",
                    transition: "all var(--mei-motion-fast)"
                  }}
                >
                  {creating ? "正在处理..." : "生成证件照"}
                </button>
              </div>
            </div>
          </section>

          {/* Card 2: Clothes */}
          {idphotoImgName && (
            <section style={{
              backgroundColor: "var(--mei-bg-elevated)",
              border: "1px solid var(--mei-border-default)",
              borderRadius: "var(--mei-radius-xl)",
              padding: "var(--mei-spacing-inset-xl)",
              boxShadow: "var(--mei-shadow-md)",
              animation: "slideUp var(--mei-motion-normal) ease-out"
            }}>
              <h2 style={{
                fontSize: "var(--mei-font-lg)",
                fontWeight: "var(--mei-weight-semibold)",
                marginBottom: "var(--mei-spacing-stack-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--mei-spacing-inline-sm)"
              }}>
                <span style={{ 
                  width: 28, height: 28, borderRadius: "var(--mei-radius-full)", 
                  backgroundColor: "var(--mei-color-success-base)", color: "var(--mei-text-inverse)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--mei-font-sm)"
                }}>2</span>
                选择正装
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--mei-spacing-stack-lg)" }}>
                {/* Tabs */}
                <div style={{
                  display: "flex", gap: 4, backgroundColor: "var(--mei-bg-surface)",
                  padding: 4, borderRadius: "var(--mei-radius-lg)"
                }}>
                  {["男装", "女装", "童装"].map((group) => {
                    const isActive = selectedClothes?.group === group
                    return (
                      <button
                        key={group}
                        onClick={() => {
                          const first = CLOTHES.find((c) => c.group === group)
                          if (first) setClothesId(first.id)
                        }}
                        style={{
                          flex: 1, padding: "8px 0", border: "none", borderRadius: "var(--mei-radius-md)",
                          fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-bold)",
                          backgroundColor: isActive ? "var(--mei-bg-elevated)" : "transparent",
                          color: isActive ? "var(--mei-color-primary-600)" : "var(--mei-text-tertiary)",
                          cursor: "pointer",
                        }}
                      >
                        {group}
                      </button>
                    )
                  })}
                </div>

                {/* Grid */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(76px, 1fr))",
                  gap: 12, maxHeight: 280, overflowY: "auto", padding: 4
                }}>
                  {CLOTHES.filter((c) => c.group === selectedClothes?.group).map((c) => {
                    const isActive = clothesId === c.id
                    return (
                      <button
                        key={c.id} onClick={() => setClothesId(c.id)}
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "center",
                          padding: "8px 4px", borderRadius: "var(--mei-radius-lg)", cursor: "pointer",
                          border: isActive ? "2px solid var(--mei-color-primary-500)" : "1px solid var(--mei-border-default)",
                          backgroundColor: isActive ? "var(--mei-color-primary-50)" : "var(--mei-bg-page)",
                          transition: "all var(--mei-motion-fast)",
                        }}
                      >
                        <img
                          src={`/clothes/${c.group}/${c.id}.jpg`} alt={c.label}
                          style={{ width: 64, height: 64, objectFit: "contain", borderRadius: "var(--mei-radius-sm)" }}
                          onError={(e) => { e.currentTarget.style.display = "none" }}
                        />
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={handleChangeClothes}
                  disabled={changing}
                  style={{
                    width: "100%", height: 48,
                    borderRadius: "var(--mei-radius-lg)", border: "none",
                    backgroundColor: changing ? "var(--mei-color-primary-300)" : "var(--mei-color-success-base)",
                    color: "var(--mei-text-inverse)", fontWeight: "var(--mei-weight-bold)",
                    cursor: changing ? "not-allowed" : "pointer",
                    boxShadow: changing ? "none" : "var(--mei-shadow-md)",
                    transition: "all var(--mei-motion-fast)"
                  }}
                >
                  {changing ? "换装中..." : "一键换装"}
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Gallery Showcase */}
        <div style={{ position: "sticky", top: "var(--mei-spacing-stack-xl)" }}>
          <section style={{
            backgroundColor: "var(--mei-bg-surface)",
            border: "1px solid var(--mei-border-default)",
            borderRadius: "var(--mei-radius-2xl)",
            padding: "var(--mei-spacing-inset-xl)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--mei-spacing-stack-xl)",
            boxShadow: "var(--mei-shadow-lg)",
            backgroundImage: "radial-gradient(circle at top right, var(--mei-color-primary-50), transparent)",
          }}>
            <header style={{ textAlign: "center" }}>
              <h3 style={{
                fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-bold)",
                color: "var(--mei-text-tertiary)", textTransform: "uppercase",
                letterSpacing: "var(--mei-letter-spacing-wide)"
              }}>
                预览区域
              </h3>
            </header>

            {/* Hero Stage */}
            <div style={{
              width: "100%", height: 440, borderRadius: "var(--mei-radius-xl)", 
              backgroundColor: "var(--mei-bg-page)", overflow: "hidden",
              position: "relative", boxShadow: "var(--mei-shadow-2xl)",
              border: "1px solid var(--mei-border-default)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Hero Preview"
                  style={{ 
                    width: "100%", height: "100%", objectFit: "contain",
                    animation: "scaleIn var(--mei-motion-normal) ease-out"
                  }}
                />
              ) : (
                <div style={{ textAlign: "center", color: "var(--mei-text-tertiary)" }}>
                  <div style={{ fontSize: 64, marginBottom: 16 }}>✨</div>
                  <p style={{ fontSize: "var(--mei-font-sm)" }}>准备迎接你的完美证件照</p>
                </div>
              )}
              
              <div style={{
                position: "absolute", top: 12, right: 12,
                padding: "4px 12px", borderRadius: "var(--mei-radius-full)",
                backgroundColor: "rgba(26, 26, 46, 0.7)", backdropFilter: "blur(8px)",
                color: "#fff", fontSize: "var(--mei-font-xs)", fontWeight: "var(--mei-weight-medium)"
              }}>
                {activeDisplay === "result" ? "最终换装" : (activeDisplay === "idphoto" ? "证件照成果" : "原始照片")}
              </div>
            </div>

            {/* Gallery Strip */}
            <div style={{ display: "flex", gap: "var(--mei-spacing-inline-md)", justifyContent: "center" }}>
              {photoPreview && (
                <button 
                  onClick={() => setActiveDisplay("original")}
                  style={{
                    width: 80, height: 100, padding: 0, overflow: "hidden",
                    borderRadius: "var(--mei-radius-lg)", border: activeDisplay === "original" ? "3px solid var(--mei-color-primary-500)" : "1px solid var(--mei-border-default)",
                    backgroundColor: "var(--mei-bg-page)", cursor: "pointer", transition: "all var(--mei-motion-fast)",
                    transform: activeDisplay === "original" ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  <img src={photoPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              )}
              
              {idphotoPreview && (
                <button 
                  onClick={() => setActiveDisplay("idphoto")}
                  style={{
                    width: 80, height: 100, padding: 0, overflow: "hidden",
                    borderRadius: "var(--mei-radius-lg)", border: activeDisplay === "idphoto" ? "3px solid var(--mei-color-primary-500)" : "1px solid var(--mei-border-default)",
                    backgroundColor: "var(--mei-bg-page)", cursor: "pointer", transition: "all var(--mei-motion-fast)",
                    transform: activeDisplay === "idphoto" ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  <img src={idphotoPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              )}

              {resultPreview && (
                <button 
                  onClick={() => setActiveDisplay("result")}
                  style={{
                    width: 80, height: 100, padding: 0, overflow: "hidden",
                    borderRadius: "var(--mei-radius-lg)", border: activeDisplay === "result" ? "3px solid var(--mei-color-primary-500)" : "1px solid var(--mei-border-default)",
                    backgroundColor: "var(--mei-bg-page)", cursor: "pointer", transition: "all var(--mei-motion-fast)",
                    transform: activeDisplay === "result" ? "scale(1.05)" : "scale(1)"
                  }}
                >
                  <img src={resultPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              )}
            </div>

            {/* Master Action Button */}
            {(resultPreview || idphotoPreview) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  onClick={async () => {
                    if (!userApiKey) {
                      setToast({ msg: "请先设置 API Key 以进行下载", type: "error" })
                      setShowSettings(true)
                      return
                    }
                    const url = activeDisplay === "result" ? resultDownloadUrl : (activeDisplay === "idphoto" ? idphotoDownloadUrl : null);
                    if (!url) return;
                    try {
                      const res = await fetch("/api/download", {
                        method: "POST", 
                        headers: { 
                          "Content-Type": "application/json",
                          "x-api-key": userApiKey 
                        },
                        body: JSON.stringify({ download_url: url }),
                      })
                      if (res.ok) {
                        const blob = await res.blob()
                        const dUrl = URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.href = dUrl
                        link.download = activeDisplay === "result" ? `clothes_${clothesId}.${fileFormat}` : `idphoto.${fileFormat}`
                        link.click()
                      } else {
                        const data = await res.json()
                        setToast({ msg: data.error || "下载失败", type: "error" })
                      }
                    } catch (err) { setToast({ msg: "下载出错", type: "error" }) }
                  }}
                  style={{
                    width: "100%", height: 52, borderRadius: "var(--mei-radius-xl)",
                    border: "none", backgroundColor: "var(--mei-color-primary-600)",
                    color: "var(--mei-text-inverse)", fontWeight: "var(--mei-weight-bold)",
                    fontSize: "var(--mei-font-base)", cursor: "pointer",
                    boxShadow: "var(--mei-shadow-md)", transition: "all var(--mei-motion-fast)"
                  }}
                >
                  {activeDisplay === "result" ? "下载最终换装图 (30点)" : "下载证件照成果 (免费)"}
                </button>
                
                {/* Secondary Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = heroImage || "";
                      link.download = "preview.jpg";
                      link.click();
                    }}
                    style={{
                      flex: 1, height: 40, borderRadius: "var(--mei-radius-lg)",
                      border: "1px solid var(--mei-border-default)", backgroundColor: "var(--mei-bg-elevated)",
                      color: "var(--mei-text-secondary)", fontSize: "var(--mei-font-xs)", cursor: "pointer"
                    }}
                  >
                    保存预览图
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* NEW: Friendly Toast Notification */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)",
          padding: "var(--mei-spacing-inset-md) var(--mei-spacing-inline-xl)",
          borderRadius: "var(--mei-radius-md)",
          backgroundColor: toast.type === "error" ? "var(--mei-text-primary)" : "var(--mei-color-primary-500)",
          color: "var(--mei-text-inverse)",
          fontSize: "var(--mei-font-sm)",
          fontWeight: "var(--mei-weight-medium)",
          boxShadow: "var(--mei-shadow-lg)",
          zIndex: 1000,
          display: "flex", alignItems: "center", gap: 8,
          animation: "toastIn var(--mei-motion-fast) ease-out"
        }}>
          {toast.type === "error" ? "⚠️" : "ℹ️"} {toast.msg}
        </div>
      )}

      <style jsx global>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.98); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  )
}
