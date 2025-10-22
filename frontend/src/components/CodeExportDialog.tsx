import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import type { WidgetConfig } from "../pages/NewWidgetBuilder"

interface CodeExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  widgetConfig: WidgetConfig
}

export function CodeExportDialog({ open, onOpenChange, widgetConfig }: CodeExportDialogProps) {
  const [copied, setCopied] = useState(false)

  const getBackgroundStyle = () => {
    switch (widgetConfig.backgroundType) {
      case "gradient":
        return `background: linear-gradient(${widgetConfig.gradientDirection || "to bottom"}, ${widgetConfig.gradientStart || "#1e3a8a"}, ${widgetConfig.gradientEnd || "#3b82f6"});`
      case "image":
        return widgetConfig.backgroundImage
          ? `background-image: url(${widgetConfig.backgroundImage}); background-size: cover; background-position: center; background-repeat: no-repeat;`
          : `background-color: ${widgetConfig.backgroundColor};`
      case "color":
      default:
        return `background-color: ${widgetConfig.backgroundColor};`
    }
  }

  const generateHTML = () => {
    const isBanner = widgetConfig.type === "banner"
    const containerStyle = isBanner
      ? "position: relative; width: 100%; top: 0; left: 0;"
      : `position: fixed; ${
          widgetConfig.position === "top"
            ? "top: 20px;"
            : widgetConfig.position === "bottom"
              ? "bottom: 20px;"
              : "top: 50%; transform: translate(-50%, -50%);"
        } left: 50%; ${widgetConfig.position !== "center" ? "transform: translateX(-50%);" : ""} z-index: 1000;`

    const widgetStyle = `${getBackgroundStyle()} border-radius: ${
      isBanner ? "0" : widgetConfig.borderRadius
    }; padding: ${widgetConfig.padding}; max-width: ${
      isBanner ? "100%" : widgetConfig.maxWidth
    }; margin: ${isBanner ? "0" : "0 auto"}; box-shadow: ${isBanner ? "none" : "0 20px 25px -5px rgba(0, 0, 0, 0.3)"};`

    const blocksHTML = widgetConfig.blocks
      .map((block) => {
        if (block.type === "spacing") {
          return `    <div style="height: ${block.styles.padding};"></div>`
        }

        if (block.type === "button") {
          const buttonStyle = Object.entries(block.styles)
            .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`)
            .join("; ")
          return `    <div style="text-align: center; margin-top: 16px;">
      <button style="${buttonStyle}; border: none; cursor: pointer; font-family: inherit;">
        ${block.content}
      </button>
    </div>`
        }

        const tag = block.type === "heading" ? "h2" : "p"
        const elementStyle = Object.entries(block.styles)
          .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`)
          .join("; ")
        return `    <${tag} style="${elementStyle}; margin: ${
          block.styles.margin || "8px 0"
        };">${block.content}</${tag}>`
      })
      .join("\n")

    return `<div id="custom-widget" style="${containerStyle}">
  <div style="${widgetStyle}">
${blocksHTML}
  </div>
</div>`
  }

  const generateJS = () => {
    return `// Add this script to initialize the widget
(function() {
  // Widget will be automatically displayed
  // You can customize the behavior here
  
  // Example: Close button functionality
  const widget = document.getElementById('custom-widget');
  
  // Add close button (optional)
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = 'position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 24px; cursor: pointer; color: #fff;';
  closeBtn.onclick = () => widget.style.display = 'none';
  
  if (widget && widget.firstElementChild) {
    widget.firstElementChild.style.position = 'relative';
    widget.firstElementChild.appendChild(closeBtn);
  }
  
  // Example: Show after delay
  setTimeout(() => {
    if (widget) widget.style.display = 'block';
  }, 1000);
})();`
  }

  const generateCSS = () => {
    return `/* Responsive styles for mobile */
@media (max-width: 768px) {
  #custom-widget > div {
    padding: ${Number.parseInt(widgetConfig.padding) * 0.7}px !important;
    max-width: 90% !important;
  }
  
  #custom-widget h2 {
    font-size: 85% !important;
  }
  
  #custom-widget p {
    font-size: 85% !important;
  }
  
  #custom-widget button {
    font-size: 85% !important;
  }
}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Export Widget Code</DialogTitle>
          <DialogDescription>Copy and paste this code into your Framer project or website</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="html" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>

          <TabsContent value="html" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm">
                <code>{generateHTML()}</code>
              </pre>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateHTML())}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="javascript" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm">
                <code>{generateJS()}</code>
              </pre>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateJS())}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="css" className="space-y-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-sm">
                <code>{generateCSS()}</code>
              </pre>
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(generateCSS())}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>How to use in Framer:</strong>
          </p>
          <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1 mt-2">
            <li>Copy the HTML code</li>
            <li>In Framer, add an Embed component to your page</li>
            <li>Paste the HTML code into the embed</li>
            <li>Optionally add the JavaScript and CSS for enhanced functionality</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}
