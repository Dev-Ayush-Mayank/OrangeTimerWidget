import { useState } from "react";
import { Sidebar } from "@/components/SideBar";
import { Card } from "@/components/ui/card";
import { BuilderSidebar } from "../components/BuilderSideBar";
import { ElementEditor } from "../components/ElementEditor";
import { PreviewArea } from "../components/PreviewArea";
import { TopBar } from "../components/TopBar";
import { CodeExportDialog } from "../components/CodeExportDialog";

export type WidgetType = "banner" | "popup";
export type DeviceView = "desktop" | "mobile";
export type BackgroundType = "color" | "gradient" | "image";

export interface WidgetBlock {
  id: string;
  type: "text" | "heading" | "button" | "spacing" | "image";
  content: string;
  visible?: boolean; // Added visible property to track element visibility
  styles: {
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    textAlign?: string;
  };
}

export interface WidgetConfig {
  type: WidgetType;
  name: string;
  backgroundColor: string;
  backgroundType: BackgroundType;
  gradientStart?: string;
  gradientEnd?: string;
  gradientDirection?: string;
  backgroundImage?: string;
  borderRadius: string;
  padding: string;
  maxWidth: string;
  position?: "top" | "bottom" | "center";
  blocks: WidgetBlock[];
}

export const NewWidgetBuilder = () => {
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [originalBlock, setOriginalBlock] = useState<WidgetBlock | null>(null);
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    type: "popup",
    name: "Untitled Widget",
    backgroundColor: "#1e3a8a",
    backgroundType: "color",
    gradientStart: "#1e3a8a",
    gradientEnd: "#3b82f6",
    gradientDirection: "to bottom",
    backgroundImage: "",
    borderRadius: "16px",
    padding: "32px",
    maxWidth: "400px",
    position: "center",
    blocks: [
      {
        id: "1",
        type: "heading",
        content: "Halloween Sale",
        visible: true, // Initialize all blocks as visible
        styles: {
          fontSize: "32px",
          fontWeight: "700",
          color: "#fb923c",
          textAlign: "center",
        },
      },
      {
        id: "2",
        type: "heading",
        content: "13% Off on everything!",
        visible: true,
        styles: {
          fontSize: "24px",
          fontWeight: "600",
          color: "#ffffff",
          textAlign: "center",
        },
      },
      {
        id: "3",
        type: "text",
        content: "Your discount coupon:",
        visible: true,
        styles: {
          fontSize: "16px",
          color: "#e5e7eb",
          textAlign: "center",
          margin: "16px 0 8px 0",
        },
      },
      {
        id: "4",
        type: "text",
        content: "Halloween2025",
        visible: true,
        styles: {
          fontSize: "20px",
          fontWeight: "700",
          color: "#ffffff",
          textAlign: "center",
        },
      },
      {
        id: "5",
        type: "spacing",
        content: "",
        visible: true,
        styles: {
          padding: "12px",
        },
      },
      {
        id: "6",
        type: "button",
        content: "Shop Now",
        visible: true,
        styles: {
          backgroundColor: "#fb923c",
          color: "#000000",
          padding: "12px 32px",
          borderRadius: "24px",
          fontSize: "18px",
          fontWeight: "600",
        },
      },
    ],
  });

  const handleBlockUpdate = (
    blockId: string,
    updates: Partial<WidgetBlock>
  ) => {
    setWidgetConfig({
      ...widgetConfig,
      blocks: widgetConfig.blocks.map((block) =>
        block.id === blockId ? { ...block, ...updates } : block
      ),
    });
  };

  const handleElementClick = (blockId: string) => {
    const block = widgetConfig.blocks.find((b) => b.id === blockId);
    if (block) {
      setOriginalBlock(JSON.parse(JSON.stringify(block))); // Deep clone
    }
    setEditingBlockId(blockId);
    setSelectedBlockId(blockId);
  };

  const handleElementUpdate = (
    blockId: string,
    updates: Partial<WidgetBlock>
  ) => {
    handleBlockUpdate(blockId, updates);
  };

  const handleElementSave = () => {
    setEditingBlockId(null);
    setSelectedBlockId(null);
    setOriginalBlock(null);
  };

  const handleElementCancel = () => {
    if (originalBlock && editingBlockId) {
      handleBlockUpdate(editingBlockId, originalBlock);
    }
    setEditingBlockId(null);
    setSelectedBlockId(null);
    setOriginalBlock(null);
  };

  return (
    <div className='flex bg-gray-50'>
      {/* First grid - 20% width */}
      <div className='fixed left-0 top-0 w-[20%]'>
        <Card className='h-full p-6 border-none bg-gray-50 rounded-none'>
          <Sidebar />
        </Card>
      </div>

      {/* Second grid - 80% width */}
      <div className='h-screen ml-[20%] w-[80%] overflow-y-auto bg-white'>
        <div className='h-screen flex flex-col bg-background'>
          <TopBar
            widgetName={widgetConfig.name}
            onNameChange={(name: any) =>
              setWidgetConfig({ ...widgetConfig, name })
            }
            onPublish={() => setShowCodeDialog(true)}
            deviceView={deviceView}
            onDeviceViewChange={setDeviceView}
          />

          <div className='flex flex-1 overflow-hidden'>
            {editingBlockId ? (
              <ElementEditor
                block={
                  widgetConfig.blocks.find((b) => b.id === editingBlockId)!
                }
                onUpdate={(updates: Partial<WidgetBlock>) =>
                  handleElementUpdate(editingBlockId, updates)
                }
                onSave={handleElementSave}
                onCancel={handleElementCancel}
              />
            ) : (
              <BuilderSidebar
                widgetConfig={widgetConfig}
                onConfigChange={setWidgetConfig}
              />
            )}

            <PreviewArea
              widgetConfig={widgetConfig}
              deviceView={deviceView}
              selectedBlockId={selectedBlockId}
              onBlockSelect={handleElementClick}
            />
          </div>

          <CodeExportDialog
            open={showCodeDialog}
            onOpenChange={setShowCodeDialog}
            widgetConfig={widgetConfig}
          />
        </div>
      </div>
    </div>
  );
};
