import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Settings, Layout, GripVertical, Upload } from "lucide-react"
import type { WidgetConfig, WidgetBlock, BackgroundType } from "../pages/NewWidgetBuilder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface BuilderSidebarProps {
  widgetConfig: WidgetConfig
  onConfigChange: (config: WidgetConfig) => void
}

export const BuilderSidebar = ({ widgetConfig, onConfigChange }: BuilderSidebarProps) => {
  const addBlock = (type: WidgetBlock["type"]) => {
    const newBlock: WidgetBlock = {
      id: Date.now().toString(),
      type,
      content:
        type === "button" ? "Click Me" : type === "heading" ? "New Heading" : type === "spacing" ? "" : "New Text",
      visible: true,
      styles: {
        fontSize: type === "heading" ? "24px" : "16px",
        color: "#ffffff",
        textAlign: "center",
        ...(type === "button" && {
          backgroundColor: "#3b82f6",
          padding: "12px 24px",
          borderRadius: "8px",
        }),
        ...(type === "spacing" && {
          padding: "16px",
        }),
      },
    }
    onConfigChange({
      ...widgetConfig,
      blocks: [...widgetConfig.blocks, newBlock],
    })
  }

  const updateBlock = (id: string, updates: Partial<WidgetBlock>) => {
    onConfigChange({
      ...widgetConfig,
      blocks: widgetConfig.blocks.map((block) => (block.id === id ? { ...block, ...updates } : block)),
    })
  }

  const toggleBlockVisibility = (id: string) => {
    onConfigChange({
      ...widgetConfig,
      blocks: widgetConfig.blocks.map((block) => (block.id === id ? { ...block, visible: !block.visible } : block)),
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onConfigChange({ ...widgetConfig, backgroundImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-96 bg-sidebar border-r border-sidebar-border flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="builder" className="flex-1 flex flex-col h-full">
        <div className="px-4 py-3 border-b border-sidebar-border flex-shrink-0">
          <TabsList className="w-full bg-sidebar-accent">
            <TabsTrigger value="builder" className="flex-1">
              <Layout className="w-4 h-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1 h-[calc(100vh-64px)]">
          <TabsContent value="builder" className="p-4 space-y-4 mt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sidebar-foreground text-sm font-medium">BLOCKS</Label>
              </div>

              {widgetConfig.blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="bg-sidebar-accent rounded-lg p-3 space-y-3 border border-sidebar-border"
                  style={{ opacity: block.visible === false ? 0.5 : 1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-sidebar-foreground/50" />
                      <span className="text-sm font-medium text-sidebar-foreground capitalize">{block.type}</span>
                      {block.visible === false && <span className="text-xs text-sidebar-foreground/50">(Hidden)</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-sidebar-foreground/70">
                        {block.visible === false ? "Hidden" : "Visible"}
                      </Label>
                      <Switch
                        checked={block.visible !== false}
                        onCheckedChange={() => toggleBlockVisibility(block.id)}
                      />
                    </div>
                  </div>

                  {block.type !== "spacing" && (
                    <Input
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      className="bg-sidebar text-sidebar-foreground"
                      placeholder="Content"
                    />
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    {block.type !== "spacing" && (
                      <>
                        <div>
                          <Label className="text-xs text-sidebar-foreground/70">Font Size</Label>
                          <Input
                            value={block.styles.fontSize || "16px"}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                styles: { ...block.styles, fontSize: e.target.value },
                              })
                            }
                            className="bg-sidebar text-sidebar-foreground h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-sidebar-foreground/70">Color</Label>
                          <Input
                            type="color"
                            value={block.styles.color || "#ffffff"}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                styles: { ...block.styles, color: e.target.value },
                              })
                            }
                            className="bg-sidebar h-8"
                          />
                        </div>
                      </>
                    )}

                    {block.type === "button" && (
                      <>
                        <div>
                          <Label className="text-xs text-sidebar-foreground/70">BG Color</Label>
                          <Input
                            type="color"
                            value={block.styles.backgroundColor || "#3b82f6"}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                styles: { ...block.styles, backgroundColor: e.target.value },
                              })
                            }
                            className="bg-sidebar h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-sidebar-foreground/70">Radius</Label>
                          <Input
                            value={block.styles.borderRadius || "8px"}
                            onChange={(e) =>
                              updateBlock(block.id, {
                                styles: { ...block.styles, borderRadius: e.target.value },
                              })
                            }
                            className="bg-sidebar text-sidebar-foreground h-8"
                          />
                        </div>
                      </>
                    )}

                    {block.type === "spacing" && (
                      <div className="col-span-2">
                        <Label className="text-xs text-sidebar-foreground/70">Height</Label>
                        <Input
                          value={block.styles.padding || "16px"}
                          onChange={(e) =>
                            updateBlock(block.id, {
                              styles: { ...block.styles, padding: e.target.value },
                            })
                          }
                          className="bg-sidebar text-sidebar-foreground h-8"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                onClick={() => {}}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Element
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addBlock("text")}
                  className="bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Text
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addBlock("heading")}
                  className="bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Heading
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addBlock("button")}
                  className="bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Button
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => addBlock("spacing")}
                  className="bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80"
                >
                  Spacing
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="p-4 space-y-4 mt-0">
            <div className="space-y-4">
              <div>
                <Label className="text-sidebar-foreground">Widget Type</Label>
                <Select
                  value={widgetConfig.type}
                  onValueChange={(value: "banner" | "popup") => onConfigChange({ ...widgetConfig, type: value })}
                >
                  <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-outfit">
                    <SelectItem value="popup">Popup</SelectItem>
                    <SelectItem value="banner">Banner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {widgetConfig.type === "popup" && (
                <div>
                  <Label className="text-sidebar-foreground">Position</Label>
                  <Select
                    value={widgetConfig.position}
                    onValueChange={(value: "top" | "bottom" | "center") =>
                      onConfigChange({ ...widgetConfig, position: value })
                    }
                  >
                    <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="font-outfit">
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label className="text-sidebar-foreground">Background Type</Label>
                <Select
                  value={widgetConfig.backgroundType}
                  onValueChange={(value: BackgroundType) => onConfigChange({ ...widgetConfig, backgroundType: value })}
                >
                  <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-outfit">
                    <SelectItem value="color">Solid Color</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {widgetConfig.backgroundType === "color" && (
                <div>
                  <Label className="text-sidebar-foreground">Background Color</Label>
                  <Input
                    type="color"
                    value={widgetConfig.backgroundColor}
                    onChange={(e) => onConfigChange({ ...widgetConfig, backgroundColor: e.target.value })}
                    className="bg-sidebar text-sidebar-foreground"
                  />
                </div>
              )}

              {widgetConfig.backgroundType === "gradient" && (
                <>
                  <div>
                    <Label className="text-sidebar-foreground">Gradient Start</Label>
                    <Input
                      type="color"
                      value={widgetConfig.gradientStart || "#1e3a8a"}
                      onChange={(e) => onConfigChange({ ...widgetConfig, gradientStart: e.target.value })}
                      className="bg-sidebar text-sidebar-foreground"
                    />
                  </div>
                  <div>
                    <Label className="text-sidebar-foreground">Gradient End</Label>
                    <Input
                      type="color"
                      value={widgetConfig.gradientEnd || "#3b82f6"}
                      onChange={(e) => onConfigChange({ ...widgetConfig, gradientEnd: e.target.value })}
                      className="bg-sidebar text-sidebar-foreground"
                    />
                  </div>
                  <div>
                    <Label className="text-sidebar-foreground">Direction</Label>
                    <Select
                      value={widgetConfig.gradientDirection || "to bottom"}
                      onValueChange={(value: string) => onConfigChange({ ...widgetConfig, gradientDirection: value })}
                    >
                      <SelectTrigger className="bg-sidebar text-sidebar-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="font-outfit">
                        <SelectItem value="to bottom">Top to Bottom</SelectItem>
                        <SelectItem value="to top">Bottom to Top</SelectItem>
                        <SelectItem value="to right">Left to Right</SelectItem>
                        <SelectItem value="to left">Right to Left</SelectItem>
                        <SelectItem value="to bottom right">Diagonal ↘</SelectItem>
                        <SelectItem value="to bottom left">Diagonal ↙</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {widgetConfig.backgroundType === "image" && (
                <div className="space-y-3">
                  <div>
                    <Label className="text-sidebar-foreground">Upload Image</Label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="bg-sidebar text-sidebar-foreground"
                        id="image-upload"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        className="shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-sidebar-foreground/60 mt-1">Upload an image from your device</p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-sidebar-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-sidebar px-2 text-sidebar-foreground/60">Or</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sidebar-foreground">Image URL</Label>
                    <Input
                      type="text"
                      value={widgetConfig.backgroundImage || ""}
                      onChange={(e) => onConfigChange({ ...widgetConfig, backgroundImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="bg-sidebar text-sidebar-foreground"
                    />
                    <p className="text-xs text-sidebar-foreground/60 mt-1">Or enter a direct image URL</p>
                  </div>

                  {widgetConfig.backgroundImage && (
                    <div>
                      <Label className="text-sidebar-foreground">Preview</Label>
                      <div className="mt-2 rounded-lg overflow-hidden border border-sidebar-border">
                        <img
                          src={widgetConfig.backgroundImage || "/placeholder.svg"}
                          alt="Background preview"
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label className="text-sidebar-foreground">Border Radius</Label>
                <Input
                  value={widgetConfig.borderRadius}
                  onChange={(e) => onConfigChange({ ...widgetConfig, borderRadius: e.target.value })}
                  className="bg-sidebar text-sidebar-foreground"
                />
              </div>

              <div>
                <Label className="text-sidebar-foreground">Padding</Label>
                <Input
                  value={widgetConfig.padding}
                  onChange={(e) => onConfigChange({ ...widgetConfig, padding: e.target.value })}
                  className="bg-sidebar text-sidebar-foreground"
                />
              </div>

              <div>
                <Label className="text-sidebar-foreground">Max Width</Label>
                <Input
                  value={widgetConfig.maxWidth}
                  onChange={(e) => onConfigChange({ ...widgetConfig, maxWidth: e.target.value })}
                  className="bg-sidebar text-sidebar-foreground"
                />
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
