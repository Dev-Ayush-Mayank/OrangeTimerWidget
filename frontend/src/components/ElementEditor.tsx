import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check, X } from "lucide-react"
import type { WidgetBlock } from "../pages/NewWidgetBuilder"

interface ElementEditorProps {
  block: WidgetBlock
  onUpdate: (updates: Partial<WidgetBlock>) => void // Real-time updates
  onSave: () => void // Just closes the editor
  onCancel: () => void
}

const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Oswald",
  "Merriweather",
  "Playfair Display",
  "Source Sans Pro",
  "Nunito",
  "Ubuntu",
  "PT Sans",
  "Quicksand",
]

const FONT_SIZES = [
  { label: "XS (12px)", value: "12px" },
  { label: "S (14px)", value: "14px" },
  { label: "M (16px)", value: "16px" },
  { label: "L (18px)", value: "18px" },
  { label: "XL (20px)", value: "20px" },
  { label: "2XL (24px)", value: "24px" },
  { label: "3XL (30px)", value: "30px" },
  { label: "4XL (36px)", value: "36px" },
  { label: "5XL (48px)", value: "48px" },
]

export function ElementEditor({ block, onUpdate, onSave, onCancel }: ElementEditorProps) {
  const updateContent = (content: string) => {
    onUpdate({ content })
  }

  const updateStyle = (key: string, value: string) => {
    onUpdate({
      styles: {
        ...block.styles,
        [key]: value,
      },
    })
  }

  return (
    <div className="w-96 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 w-8 p-0">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-sm font-semibold text-sidebar-foreground capitalize">Edit {block.type}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSave} className="flex-1" size="sm">
            <Check className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button onClick={onCancel} variant="outline" className="flex-1 bg-transparent" size="sm">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Editor Content */}
        <div className="p-4 space-y-4">
          {/* Content */}
          {block.type !== "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Content</Label>
              {block.type === "button" || block.type === "heading" ? (
                <Input
                  value={block.content}
                  onChange={(e) => updateContent(e.target.value)}
                  className="bg-sidebar text-sidebar-foreground"
                  placeholder="Enter content"
                />
              ) : (
                <Textarea
                  value={block.content}
                  onChange={(e) => updateContent(e.target.value)}
                  className="bg-sidebar text-sidebar-foreground min-h-[100px]"
                  placeholder="Enter content"
                />
              )}
            </div>
          )}

          {/* Font Family */}
          {block.type !== "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Font Family</Label>
              <Select
                value={block.styles.fontFamily || "Inter"}
                onValueChange={(value) => updateStyle("fontFamily", value)}
              >
                <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GOOGLE_FONTS.map((font) => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Font Size */}
          {block.type !== "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Font Size</Label>
              <Select value={block.styles.fontSize || "16px"} onValueChange={(value) => updateStyle("fontSize", value)}>
                <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FONT_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Font Weight */}
          {block.type !== "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Font Weight</Label>
              <Select
                value={block.styles.fontWeight || "400"}
                onValueChange={(value) => updateStyle("fontWeight", value)}
              >
                <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">Semibold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                  <SelectItem value="800">Extra Bold (800)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Text Color */}
          {block.type !== "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={block.styles.color || "#ffffff"}
                  onChange={(e) => updateStyle("color", e.target.value)}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  value={block.styles.color || "#ffffff"}
                  onChange={(e) => updateStyle("color", e.target.value)}
                  className="flex-1 bg-sidebar text-sidebar-foreground"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          )}

          {/* Text Align */}
          {block.type !== "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Text Align</Label>
              <Select
                value={block.styles.textAlign || "center"}
                onValueChange={(value) => updateStyle("textAlign", value)}
              >
                <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Button Specific */}
          {block.type === "button" && (
            <>
              <div>
                <Label className="text-sidebar-foreground">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={block.styles.backgroundColor || "#3b82f6"}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="w-16 h-10"
                  />
                  <Input
                    type="text"
                    value={block.styles.backgroundColor || "#3b82f6"}
                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                    className="flex-1 bg-sidebar text-sidebar-foreground"
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sidebar-foreground">Padding</Label>
                <Input
                  value={block.styles.padding || "12px 24px"}
                  onChange={(e) => updateStyle("padding", e.target.value)}
                  className="bg-sidebar text-sidebar-foreground"
                  placeholder="12px 24px"
                />
              </div>

              <div>
                <Label className="text-sidebar-foreground">Border Radius</Label>
                <Input
                  value={block.styles.borderRadius || "8px"}
                  onChange={(e) => updateStyle("borderRadius", e.target.value)}
                  className="bg-sidebar text-sidebar-foreground"
                  placeholder="8px"
                />
              </div>
            </>
          )}

          {/* Spacing Specific */}
          {block.type === "spacing" && (
            <div>
              <Label className="text-sidebar-foreground">Height</Label>
              <Input
                value={block.styles.padding || "16px"}
                onChange={(e) => updateStyle("padding", e.target.value)}
                className="bg-sidebar text-sidebar-foreground"
                placeholder="16px"
              />
            </div>
          )}

          {/* Margin */}
          {block.type !== "spacing" && block.type !== "button" && (
            <div>
              <Label className="text-sidebar-foreground">Margin</Label>
              <Input
                value={block.styles.margin || "8px 0"}
                onChange={(e) => updateStyle("margin", e.target.value)}
                className="bg-sidebar text-sidebar-foreground"
                placeholder="8px 0"
              />
            </div>
          )}
        </div>
    </div>
  )
}
