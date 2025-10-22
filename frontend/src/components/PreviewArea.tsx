import type { WidgetConfig, DeviceView } from "../pages/NewWidgetBuilder"   
import { WidgetRenderer } from "../components/WidgetRender"

interface PreviewAreaProps {
  widgetConfig: WidgetConfig
  deviceView: DeviceView
  selectedBlockId: string | null
  onBlockSelect: (blockId: string) => void
}

export function PreviewArea({ widgetConfig, deviceView, selectedBlockId, onBlockSelect }: PreviewAreaProps) {
  return (
    <div className="flex-1 bg-muted/30 flex items-center justify-center p-8">
      <div
        className={`bg-background rounded-lg shadow-2xl transition-all duration-300 relative ${
          deviceView === "desktop" ? "w-full max-w-5xl h-[700px]" : "w-[375px] h-[667px]"
        }`}
      >
        <div className="w-full h-full relative overflow-hidden">
          <WidgetRenderer
            config={widgetConfig}
            deviceView={deviceView}
            selectedBlockId={selectedBlockId}
            onBlockSelect={onBlockSelect}
          />
        </div>
      </div>
    </div>
  )
}
