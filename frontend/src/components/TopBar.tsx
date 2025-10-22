import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Monitor, Smartphone, Code } from "lucide-react"
import type { DeviceView } from "../pages/NewWidgetBuilder"

interface TopBarProps {
  widgetName: string
  onNameChange: (name: string) => void
  onPublish: () => void
  deviceView: DeviceView
  onDeviceViewChange: (view: DeviceView) => void
}

export const TopBar = ({ widgetName, onNameChange, onPublish, deviceView, onDeviceViewChange }: TopBarProps) => {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          <Input value={widgetName} onChange={(e) => onNameChange(e.target.value)} className="w-64 bg-background" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={deviceView === "desktop" ? "default" : "ghost"}
            size="sm"
            onClick={() => onDeviceViewChange("desktop")}
            className="gap-2"
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </Button>
          <Button
            variant={deviceView === "mobile" ? "default" : "ghost"}
            size="sm"
            onClick={() => onDeviceViewChange("mobile")}
            className="gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </Button>
        </div>

        <Button onClick={onPublish} className="bg-primary hover:bg-primary/90">
          Get Code
        </Button>
      </div>
    </div>
  )
}
