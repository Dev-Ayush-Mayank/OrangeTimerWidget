import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Code2, Link2, Copy, Edit3, EyeOff, Trash2, MoreHorizontal } from "lucide-react"

export const WidgetList = () => {
  const [countdown] = useState({ hours: 0, minutes: 0, seconds: 1 })
  const [isRenaming, setIsRenaming] = useState(false)
  const [widgetTitle, setWidgetTitle] = useState("Untitled Countdown Timer")
  const [tempTitle, setTempTitle] = useState("")

  const handleRenameClick = () => {
    setTempTitle(widgetTitle)
    setIsRenaming(true)
  }

  const handleSaveTitle = () => {
    if (tempTitle.trim()) {
      setWidgetTitle(tempTitle.trim())
    }
    setIsRenaming(false)
  }

  const handleCancelRename = () => {
    setTempTitle("")
    setIsRenaming(false)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <Card className="p-8 bg-white">
        <div className="flex items-start gap-8">
          {/* Left side - Widget Preview */}
          <div className="flex-shrink-0 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xl">⚡</span>
                <span className="text-gray-700">Limited-time offer! Sale ends in</span>
              </div>

              {/* Countdown Display */}
              <div className="flex gap-2">
                <div className="bg-blue-600 text-white rounded-lg w-14 h-16 flex items-center justify-center">
                  <span className="text-3xl font-bold">0</span>
                </div>
                <div className="bg-blue-600 text-white rounded-lg w-14 h-16 flex items-center justify-center">
                  <span className="text-3xl font-bold">0</span>
                </div>
                <div className="bg-blue-600 text-white rounded-lg w-14 h-16 flex items-center justify-center">
                  <span className="text-3xl font-bold">{countdown.seconds}</span>
                </div>
              </div>

              {/* Shop Now Button */}
              <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full py-5 text-sm font-medium">
                Shop now
              </Button>
            </div>
          </div>

          {/* Center - Widget Info and Actions */}
          <div className="flex-1 space-y-6">
            {isRenaming ? (
              <div className="space-y-3">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="text-2xl font-semibold text-blue-600 h-auto py-2"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle()
                    if (e.key === "Escape") handleCancelRename()
                  }}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveTitle} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save
                  </Button>
                  <Button onClick={handleCancelRename} size="sm" variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-blue-600">{widgetTitle}</h1>
                <p className="text-gray-500 text-sm">Created Oct 7, 2025</p>
              </div>
            )}

            {/* Edit and Install Buttons */}
            {!isRenaming && (
              <div className="flex gap-3">
                <Button variant="secondary" className="px-8 py-5 text-sm font-medium bg-gray-100 hover:bg-gray-200">
                  Edit
                </Button>
                <Button variant="secondary" className="px-8 py-5 text-sm font-medium bg-gray-100 hover:bg-gray-200">
                  Install
                </Button>
              </div>
            )}
          </div>

          {/* Right - Three-dot menu */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 font-outfit">
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <Code2 className="mr-3 h-4 w-4" />
                  <span className="flex-1">Embed Code</span>
                  <Code2 className="h-4 w-4 text-gray-400" />
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <Link2 className="mr-3 h-4 w-4" />
                  <span className="flex-1">Share by Link</span>
                  <Link2 className="h-4 w-4 text-gray-400" />
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer justify-between">
                  <span className="flex-1">Remove Elfsight Branding</span>
                  <span className="text-purple-600 text-xs font-semibold">UPGRADE</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <Copy className="mr-3 h-4 w-4" />
                  <span className="flex-1">Duplicate</span>
                  <Copy className="h-4 w-4 text-gray-400" />
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer" onClick={handleRenameClick}>
                  <Edit3 className="mr-3 h-4 w-4" />
                  <span className="flex-1">Rename widget</span>
                  <Edit3 className="h-4 w-4 text-gray-400" />
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 cursor-pointer">
                  <EyeOff className="mr-3 h-4 w-4" />
                  <span className="flex-1">Hide from Website</span>
                  <EyeOff className="h-4 w-4 text-gray-400" />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="py-3 cursor-pointer text-red-600 focus:text-red-600">
                  <Trash2 className="mr-3 h-4 w-4" />
                  <span className="flex-1">Delete Widget</span>
                  <Trash2 className="h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </div>
  )
}
