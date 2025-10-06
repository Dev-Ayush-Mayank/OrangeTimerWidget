"use client"

import { useState } from "react"
import { TimerPreview } from "../components/TimerPreview"
import { SettingsPanel } from "../components/SettingsPanel"
import { EmbedCodeCard } from "../components/EmbedCodeCard"
import type { TimerConfig } from "../lib/timer"
import { Card } from "@/components/ui/card"
import { Sidebar } from "@/components/SideBar"

export const TimerWidgetBuilder = () => {
  const [config, setConfig] = useState<TimerConfig>({
    timerType: "countdown",
    layout: "centered",
    bannerPosition: "top",
    bannerScale: 1,
    bannerHeight: 80,
    showCloseButton: true,
    text: "⚡ Limited-time offer! Sale ends in",
    textPosition: "top",
    buttonText: "Shop now",
    buttonPosition: "bottom",
    buttonUrl: "https://example.com",
    showButton: true,
    buttonTextAnimation: "none",
    buttonTextAnimationDuration: 2,
    targetDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    timezone: "UTC",
    timerStyle: "rounded",
    digitAnimation: "none",
    backgroundColor: "#f8fafc",
    backgroundImage: null,
    textFont: "font-sans",
    buttonFont: "font-sans",
    textColor: "#1e293b",
    timerColor: "#3b82f6",
    timerTextColor: "#ffffff",
    buttonColor: "#1f2937",
    buttonTextColor: "#ffffff",
    buttonHoverColor: "#111827",
    showLabels: true,
    showDaysLabel: true,
    showHoursLabel: true,
    showMinutesLabel: true,
    showSecondsLabel: true,
    showDays: true,
    showHours: true,
    showMinutes: true,
    showSeconds: true,
    labelDays: "Days",
    labelHours: "Hours",
    labelMinutes: "Minutes",
    labelSeconds: "Seconds",
    showTimerShadow: true,
    showButtonShadow: true,
    customTextCSS: "",
    customButtonCSS: "",
    customTimerCSS: "",
    startNumber: 0,
    endNumber: 1000,
    counterDuration: 60,
    visitorCountdownDuration: 24,
    textAnimation: "none",
    textAnimationDuration: 2,
  })

  const updateConfig = (updates: Partial<TimerConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }))
  }

  return (
     <div className="flex bg-gray-50">
      {/* First grid - 20% width */}
      <div className="fixed left-0 top-0 w-[20%]">
        <Card className="h-full p-6 border-none bg-gray-50 rounded-none">
          <Sidebar />
        </Card>
      </div>

      {/* Second grid - 80% width */}
      <div className="h-screen ml-[20%] w-[80%] overflow-y-auto bg-white">
       <div className="flex h-screen">
      <div className="w-[40%] border-r border-slate-200 bg-white overflow-auto">
        <SettingsPanel config={config} updateConfig={updateConfig} />
      </div>
      <div className="flex-1 overflow-auto w-[60%]">
        <div className="p-6 space-y-6">
          <TimerPreview config={config} />
          <EmbedCodeCard config={config} />
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}
