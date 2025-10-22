import type React from "react"
import { useEffect } from "react"
import type { WidgetConfig, DeviceView } from "../pages/NewWidgetBuilder"

interface WidgetRendererProps {
  config: WidgetConfig
  deviceView: DeviceView
  selectedBlockId?: string | null
  onBlockSelect?: (blockId: string) => void
}

const loadGoogleFont = (fontName: string) => {
  const fontId = `google-font-${fontName.replace(/\s+/g, "-")}`
  if (!document.getElementById(fontId)) {
    const link = document.createElement("link")
    link.id = fontId
    link.rel = "stylesheet"
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, "+")}:wght@300;400;500;600;700;800&display=swap`
    document.head.appendChild(link)
  }
}

export const WidgetRenderer = ({ config, deviceView, selectedBlockId, onBlockSelect }: WidgetRendererProps) => {
  const isBanner = config.type === "banner"
  const isMobile = deviceView === "mobile"

  useEffect(() => {
    config.blocks.forEach((block) => {
      if (block.styles.fontFamily) {
        const fontName = block.styles.fontFamily.split(",")[0].replace(/['"]/g, "").trim()
        loadGoogleFont(fontName)
      }
    })
  }, [config.blocks])

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    ...(isBanner
      ? {
          width: "100%",
          top: 0,
          left: 0,
        }
      : {
          top: config.position === "top" ? "20px" : config.position === "bottom" ? "auto" : "50%",
          bottom: config.position === "bottom" ? "20px" : "auto",
          left: "50%",
          transform: config.position === "center" ? "translate(-50%, -50%)" : "translateX(-50%)",
        }),
    zIndex: 10,
  }

  const getBackgroundStyle = (): React.CSSProperties => {
    switch (config.backgroundType) {
      case "gradient":
        return {
          backgroundImage: `linear-gradient(${config.gradientDirection || "to bottom"}, ${config.gradientStart || "#1e3a8a"}, ${config.gradientEnd || "#3b82f6"})`,
        }
      case "image":
        return {
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      case "color":
      default:
        return {
          backgroundColor: config.backgroundColor,
        }
    }
  }

  const widgetStyle: React.CSSProperties = {
    ...getBackgroundStyle(),
    borderRadius: isBanner ? "0" : config.borderRadius,
    padding: isMobile ? `${Number.parseInt(config.padding) * 0.7}px` : config.padding,
    maxWidth: isBanner ? "100%" : isMobile ? "90%" : config.maxWidth,
    margin: isBanner ? "0" : "0 auto",
    boxShadow: isBanner ? "none" : "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
  }

  const handleBlockClick = (e: React.MouseEvent, blockId: string) => {
    e.stopPropagation()
    if (onBlockSelect) {
      onBlockSelect(blockId)
    }
  }

  return (
    <div style={containerStyle}>
      <div style={widgetStyle}>
        {config.blocks
          .filter((block) => block.visible !== false)
          .map((block) => {
            const isSelected = selectedBlockId === block.id

            if (block.type === "spacing") {
              return (
                <div
                  key={block.id}
                  style={{
                    height: block.styles.padding,
                    position: "relative",
                    outline: isSelected ? "2px dashed #3b82f6" : "none",
                    outlineOffset: "2px",
                    cursor: onBlockSelect ? "pointer" : "default",
                  }}
                  onClick={(e) => onBlockSelect && handleBlockClick(e, block.id)}
                />
              )
            }

            if (block.type === "button") {
              return (
                <div key={block.id} style={{ textAlign: "center", marginTop: "16px", position: "relative" }}>
                  <button
                    style={{
                      ...(block.styles as React.CSSProperties),
                      border: "none",
                      cursor: onBlockSelect ? "pointer" : "default",
                      fontFamily: block.styles.fontFamily || "inherit",
                      fontSize: isMobile
                        ? `${Number.parseInt(block.styles.fontSize || "16px") * 0.85}px`
                        : block.styles.fontSize,
                      position: "relative",
                      outline: isSelected ? "2px solid #3b82f6" : "none",
                      outlineOffset: "4px",
                    }}
                    onClick={(e) => onBlockSelect && handleBlockClick(e, block.id)}
                  >
                    {block.content}
                  </button>
                </div>
              )
            }

            const Tag = block.type === "heading" ? "h2" : "p"
            return (
              <div key={block.id} style={{ position: "relative" }}>
                <Tag
                  style={{
                    ...(block.styles as React.CSSProperties),
                    margin: block.styles.margin || "8px 0",
                    fontFamily: block.styles.fontFamily || "inherit",
                    fontSize: isMobile
                      ? `${Number.parseInt(block.styles.fontSize || "16px") * 0.85}px`
                      : block.styles.fontSize,
                    outline: isSelected ? "2px solid #3b82f6" : "none",
                    outlineOffset: "2px",
                    cursor: onBlockSelect ? "pointer" : "default",
                    borderRadius: "4px",
                  }}
                  onClick={(e) => onBlockSelect && handleBlockClick(e, block.id)}
                >
                  {block.content}
                </Tag>
              </div>
            )
          })}
      </div>
    </div>
  )
}
