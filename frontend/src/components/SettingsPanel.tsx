import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Download, Calendar, Clock, Palette, Timer, Globe, Layout } from "lucide-react"
import type { TimerConfig } from "../lib/timer"
import { themes } from "@/lib/themes"
import { timezones } from "../lib/timezone"
import { fontCategories, getFontsByCategory, loadGoogleFont } from "../lib/GoogleFonts"

interface SettingsPanelProps {
  config: TimerConfig
  updateConfig: (updates: Partial<TimerConfig>) => void
}

export const SettingsPanel = ({ config, updateConfig }: SettingsPanelProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateConfig({ backgroundImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveConfig = () => {
    const jsonData = JSON.stringify(config, null, 2)
    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `timer-config-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const targetDateObj = new Date(config.targetDate)
  const dateValue = targetDateObj.toISOString().slice(0, 10)
  const timeValue = targetDateObj.toTimeString().slice(0, 5)

  const handleDateChange = (newDate: string) => {
    const [year, month, day] = newDate.split("-")
    const updatedDate = new Date(config.targetDate)
    updatedDate.setFullYear(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
    updateConfig({ targetDate: updatedDate.toISOString() })
  }

  const handleTimeChange = (newTime: string) => {
    const [hours, minutes] = newTime.split(":")
    const updatedDate = new Date(config.targetDate)
    updatedDate.setHours(Number.parseInt(hours), Number.parseInt(minutes))
    updateConfig({ targetDate: updatedDate.toISOString() })
  }

  const handleThemeChange = (themeName: string) => {
    const selectedTheme = themes.find((t) => t.name === themeName)
    if (selectedTheme) {
      updateConfig(selectedTheme.config)
    }
  }

  const getCurrentTheme = () => {
    for (const theme of themes) {
      if (
        theme.config.backgroundColor === config.backgroundColor &&
        theme.config.timerColor === config.timerColor &&
        theme.config.buttonColor === config.buttonColor
      ) {
        return theme.name
      }
    }
    return ""
  }

  const canHideUnit = (unitToHide: "days" | "hours" | "minutes" | "seconds") => {
    const visibleUnits = [
      unitToHide !== "days" && config.showDays,
      unitToHide !== "hours" && config.showHours,
      unitToHide !== "minutes" && config.showMinutes,
      unitToHide !== "seconds" && config.showSeconds,
    ].filter(Boolean).length

    return visibleUnits > 0
  }

   const handleFontChange = (fontName: string, type: "text" | "button") => {
    loadGoogleFont(fontName)
    if (type === "text") {
      updateConfig({ textFont: fontName })
    } else {
      updateConfig({ buttonFont: fontName })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Timer Settings</h2>
        <p className="text-sm text-slate-600">Customize your countdown timer widget</p>
      </div>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layout className="w-5 h-5" />
            Layout Configuration
          </CardTitle>
          <CardDescription>Choose how your timer widget will be displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="layout">Layout Type</Label>
            <Select value={config.layout} onValueChange={(value: any) => updateConfig({ layout: value })}>
              <SelectTrigger id="layout">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-outfit">
                <SelectItem value="centered">Centered (Full Page)</SelectItem>
                <SelectItem value="banner">Banner (Fixed Position)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {config.layout === "centered" && "Display timer in the center of the page"}
              {config.layout === "banner" && "Display timer as a fixed banner at top or bottom"}
            </p>
          </div>

          {config.layout === "banner" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bannerPosition">Banner Position</Label>
                <Select
                  value={config.bannerPosition}
                  onValueChange={(value: any) => updateConfig({ bannerPosition: value })}
                >
                  <SelectTrigger id="bannerPosition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="font-outfit">
                    <SelectItem value="top">Top of Page</SelectItem>
                    <SelectItem value="bottom">Bottom of Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

               <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bannerHeight">Banner Height</Label>
                  <span className="text-sm text-muted-foreground">{config.bannerHeight}px</span>
                </div>
                <input
                  id="bannerHeight"
                  type="range"
                  min="60"
                  max="200"
                  step="10"
                  value={config.bannerHeight}
                  onChange={(e) => updateConfig({ bannerHeight: Number(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the overall height of the banner (content will scale proportionally)
                </p>
              </div>

               <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bannerScale">Banner Content Size</Label>
                  <span className="text-sm text-muted-foreground">{Math.round(config.bannerScale * 100)}%</span>
                </div>
                <input
                  id="bannerScale"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={config.bannerScale}
                  onChange={(e) => updateConfig({ bannerScale: Number(e.target.value) })}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Adjust the size of all banner elements (text, timer, button)
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showCloseButton">Show Close Button</Label>
                <Switch
                  id="showCloseButton"
                  checked={config.showCloseButton}
                  onCheckedChange={(checked) => updateConfig({ showCloseButton: checked })}
                />
              </div>
              <p className="text-xs text-muted-foreground">Allow users to close the banner by clicking the X button</p>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Theme Presets
          </CardTitle>
          <CardDescription>Choose a pre-designed theme to get started quickly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {themes.map((theme) => (
              <label
                key={theme.name}
                className="relative flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 hover:bg-accent/50"
                style={{
                  borderColor: getCurrentTheme() === theme.name ? "hsl(var(--primary))" : "hsl(var(--border))",
                  backgroundColor: getCurrentTheme() === theme.name ? "hsl(var(--accent))" : "transparent",
                }}
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme.name}
                  checked={getCurrentTheme() === theme.name}
                  onChange={() => handleThemeChange(theme.name)}
                  className="mt-1"
                />
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="font-semibold text-base">{theme.name}</div>
                    <div className="text-sm text-muted-foreground">{theme.description}</div>
                  </div>
                  <div
                    className="rounded-lg p-3 flex items-center gap-2 text-xs"
                    style={{
                      backgroundColor: theme.config.backgroundColor,
                    }}
                  >
                    <div
                      className="px-2 py-1 rounded font-bold"
                      style={{
                        backgroundColor: theme.config.timerColor,
                        color: theme.config.timerTextColor,
                      }}
                    >
                      00
                    </div>
                    <div
                      className="px-2 py-1 rounded font-bold"
                      style={{
                        backgroundColor: theme.config.timerColor,
                        color: theme.config.timerTextColor,
                      }}
                    >
                      00
                    </div>
                    <div
                      className="px-2 py-1 rounded font-bold"
                      style={{
                        backgroundColor: theme.config.timerColor,
                        color: theme.config.timerTextColor,
                      }}
                    >
                      00
                    </div>
                    <div
                      className="px-2 py-1 rounded font-bold"
                      style={{
                        backgroundColor: theme.config.timerColor,
                        color: theme.config.timerTextColor,
                      }}
                    >
                      00
                    </div>
                    {theme.config.showButton && (
                      <div
                        className="ml-auto px-3 py-1 rounded font-semibold"
                        style={{
                          backgroundColor: theme.config.buttonColor,
                          color: theme.config.buttonTextColor,
                        }}
                      >
                        {theme.config.buttonText}
                      </div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            After selecting a theme, you can further customize all settings below
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            Timer Type
          </CardTitle>
          <CardDescription>Choose the type of timer you want to display</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timerType">Type</Label>
            <Select value={config.timerType} onValueChange={(value: any) => updateConfig({ timerType: value })}>
              <SelectTrigger id="timerType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-outfit">
                <SelectItem value="countdown">Start-To-Finish Timer</SelectItem>
                <SelectItem value="visitor-countdown">Remaining Time Counter Per Visitor</SelectItem>
                <SelectItem value="number-counter">Start-To-Finish Number Counter</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {config.timerType === "countdown" && "Countdown to a specific date and time"}
              {config.timerType === "visitor-countdown" &&
                "Each visitor sees their own countdown starting from when they first visit"}
              {config.timerType === "number-counter" && "Count up from a start number to an end number"}
            </p>
          </div>

          {config.timerType === "visitor-countdown" && (
            <div className="space-y-2">
              <Label htmlFor="visitorCountdownDuration">Countdown Duration (hours)</Label>
              <Input
                id="visitorCountdownDuration"
                type="number"
                min="1"
                value={config.visitorCountdownDuration}
                onChange={(e) => updateConfig({ visitorCountdownDuration: Number(e.target.value) })}
              />
              <p className="text-xs text-muted-foreground">
                How many hours each visitor will see counting down from their first visit
              </p>
            </div>
          )}

          {config.timerType === "number-counter" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startNumber">Start Number</Label>
                  <Input
                    id="startNumber"
                    type="number"
                    value={config.startNumber}
                    onChange={(e) => updateConfig({ startNumber: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endNumber">End Number</Label>
                  <Input
                    id="endNumber"
                    type="number"
                    value={config.endNumber}
                    onChange={(e) => updateConfig({ endNumber: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="counterDuration">Animation Duration (seconds)</Label>
                <Input
                  id="counterDuration"
                  type="number"
                  min="1"
                  value={config.counterDuration}
                  onChange={(e) => updateConfig({ counterDuration: Number(e.target.value) })}
                />
                <p className="text-xs text-muted-foreground">How long it takes to count from start to end number</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>Configure the heading text and target date</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Heading Text</Label>
            <Textarea
              id="text"
              value={config.text}
              onChange={(e) => updateConfig({ text: e.target.value })}
              placeholder="Enter your heading text"
              rows={2}
            />
          </div>

          {config.timerType === "countdown" && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Target Date & Time</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="targetDate" className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Date
                  </Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={dateValue}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full cursor-pointer rounded-lg border-input hover:bg-accent/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetTime" className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Time
                  </Label>
                  <Input
                    id="targetTime"
                    type="time"
                    value={timeValue}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="w-full cursor-pointer rounded-lg border-input hover:bg-accent/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Timezone
                </Label>
                <Select value={config.timezone} onValueChange={(value) => updateConfig({ timezone: value })}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] font-outfit">
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label} ({tz.offset})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">The countdown will be calculated based on this timezone</p>
              </div>

              <div className="mt-3 p-3 rounded-lg border border-border bg-muted/50">
                <p className="text-sm font-medium text-foreground">
                  Selected:{" "}
                  {targetDateObj.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: config.timezone,
                  })}
                </p>
              </div>
            </div>
          )}

          {config.layout === "centered" && (
            <div className="space-y-2">
              <Label htmlFor="textPosition">Text Position</Label>
              <Select value={config.textPosition} onValueChange={(value: any) => updateConfig({ textPosition: value })}>
                <SelectTrigger id="textPosition">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="font-outfit">
                  <SelectItem value="top">Top</SelectItem>
                  {/* <SelectItem value="right">Right</SelectItem> */}
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="textFont">Text Font Family</Label>
            <Select value={config.textFont} onValueChange={(value) => handleFontChange(value, "text")}>
              <SelectTrigger id="textFont">
                <SelectValue />
              </SelectTrigger>
             <SelectContent className="max-h-[400px]">
                {fontCategories.map((category) => (
                  <div key={category}>
                    <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{category}</div>
                    {getFontsByCategory(category).map((font) => (
                      <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                        {font.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={config.textColor}
                onChange={(e) => updateConfig({ textColor: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={config.textColor}
                onChange={(e) => updateConfig({ textColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="textAnimation">Text Animation</Label>
            <Select value={config.textAnimation} onValueChange={(value: any) => updateConfig({ textAnimation: value })}>
              <SelectTrigger id="textAnimation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-outfit">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="glitch">Glitch</SelectItem>
                <SelectItem value="fade">Fade In</SelectItem>
                <SelectItem value="pulse">Pulse</SelectItem>
                <SelectItem value="wave">Wave</SelectItem>
                <SelectItem value="typewriter">Typewriter</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Animation effect for the heading text</p>
          </div>

          {config.textAnimation !== "none" && (
            <div className="space-y-2">
             <Label htmlFor="textAnimationDuration">Animation Repeat Interval (seconds)</Label>
              <Input
                id="textAnimationDuration"
                type="number"
                min="0.5"
                max="10"
                step="0.5"
                value={config.textAnimationDuration}
                onChange={(e) => updateConfig({ textAnimationDuration: Number(e.target.value) })}
              />
              <p className="text-xs text-muted-foreground">How long to wait before repeating the animation</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timer Configuration</CardTitle>
          <CardDescription>Customize timer appearance and labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timerStyle">Timer Style</Label>
            <Select value={config.timerStyle} onValueChange={(value: any) => updateConfig({ timerStyle: value })}>
              <SelectTrigger id="timerStyle">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-outfit">
                <SelectItem value="rounded">Rounded</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="none">No Border</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="digitAnimation">Digit Animation</Label>
            <Select
              value={config.digitAnimation}
              onValueChange={(value: any) => updateConfig({ digitAnimation: value })}
            >
              <SelectTrigger id="digitAnimation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-outfit">
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="bounce">Bounce</SelectItem>
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="flip">Flip</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Animation effect when digits change</p>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Visible Timer Units</Label>
            <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center justify-between">
                <Label htmlFor="showDays" className="text-sm">
                  Show Days
                </Label>
                <Switch
                  id="showDays"
                  checked={config.showDays}
                  onCheckedChange={(checked) => {
                    if (!checked && canHideUnit("days")) {
                      updateConfig({ showDays: checked })
                    } else if (checked) {
                      updateConfig({ showDays: checked })
                    }
                  }}
                  disabled={config.showDays && !canHideUnit("days")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showHours" className="text-sm">
                  Show Hours
                </Label>
                <Switch
                  id="showHours"
                  checked={config.showHours}
                  onCheckedChange={(checked) => {
                    if (!checked && canHideUnit("hours")) {
                      updateConfig({ showHours: checked })
                    } else if (checked) {
                      updateConfig({ showHours: checked })
                    }
                  }}
                  disabled={config.showHours && !canHideUnit("hours")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showMinutes" className="text-sm">
                  Show Minutes
                </Label>
                <Switch
                  id="showMinutes"
                  checked={config.showMinutes}
                  onCheckedChange={(checked) => {
                    if (!checked && canHideUnit("minutes")) {
                      updateConfig({ showMinutes: checked })
                    } else if (checked) {
                      updateConfig({ showMinutes: checked })
                    }
                  }}
                  disabled={config.showMinutes && !canHideUnit("minutes")}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showSeconds" className="text-sm">
                  Show Seconds
                </Label>
                <Switch
                  id="showSeconds"
                  checked={config.showSeconds}
                  onCheckedChange={(checked) => {
                    if (!checked && canHideUnit("seconds")) {
                      updateConfig({ showSeconds: checked })
                    } else if (checked) {
                      updateConfig({ showSeconds: checked })
                    }
                  }}
                  disabled={config.showSeconds && !canHideUnit("seconds")}
                />
              </div>

              <p className="text-xs text-muted-foreground mt-2">At least one timer unit must be visible</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showLabels">Show Labels</Label>
            <Switch
              id="showLabels"
              checked={config.showLabels}
              onCheckedChange={(checked) => updateConfig({ showLabels: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showTimerShadow">Timer Shadow</Label>
            <Switch
              id="showTimerShadow"
              checked={config.showTimerShadow}
              onCheckedChange={(checked) => updateConfig({ showTimerShadow: checked })}
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Timer Labels</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="labelDays" className="text-xs">
                    Days Label
                  </Label>
                  <Switch
                    id="showDaysLabel"
                    checked={config.showDaysLabel}
                    onCheckedChange={(checked) => updateConfig({ showDaysLabel: checked })}
                    disabled={!config.showLabels || !config.showDays}
                  />
                </div>
                <Input
                  id="labelDays"
                  value={config.labelDays}
                  onChange={(e) => updateConfig({ labelDays: e.target.value })}
                  placeholder="Days"
                  disabled={!config.showLabels || !config.showDaysLabel || !config.showDays}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="labelHours" className="text-xs">
                    Hours Label
                  </Label>
                  <Switch
                    id="showHoursLabel"
                    checked={config.showHoursLabel}
                    onCheckedChange={(checked) => updateConfig({ showHoursLabel: checked })}
                    disabled={!config.showLabels || !config.showHours}
                  />
                </div>
                <Input
                  id="labelHours"
                  value={config.labelHours}
                  onChange={(e) => updateConfig({ labelHours: e.target.value })}
                  placeholder="Hours"
                  disabled={!config.showLabels || !config.showHoursLabel || !config.showHours}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="labelMinutes" className="text-xs">
                    Minutes Label
                  </Label>
                  <Switch
                    id="showMinutesLabel"
                    checked={config.showMinutesLabel}
                    onCheckedChange={(checked) => updateConfig({ showMinutesLabel: checked })}
                    disabled={!config.showLabels || !config.showMinutes}
                  />
                </div>
                <Input
                  id="labelMinutes"
                  value={config.labelMinutes}
                  onChange={(e) => updateConfig({ labelMinutes: e.target.value })}
                  placeholder="Minutes"
                  disabled={!config.showLabels || !config.showMinutesLabel || !config.showMinutes}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="labelSeconds" className="text-xs">
                    Seconds Label
                  </Label>
                  <Switch
                    id="showSecondsLabel"
                    checked={config.showSecondsLabel}
                    onCheckedChange={(checked) => updateConfig({ showSecondsLabel: checked })}
                    disabled={!config.showLabels || !config.showSeconds}
                  />
                </div>
                <Input
                  id="labelSeconds"
                  value={config.labelSeconds}
                  onChange={(e) => updateConfig({ labelSeconds: e.target.value })}
                  placeholder="Seconds"
                  disabled={!config.showLabels || !config.showSecondsLabel || !config.showSeconds}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timerColor">Timer Background</Label>
            <div className="flex gap-2">
              <Input
                id="timerColor"
                type="color"
                value={config.timerColor}
                onChange={(e) => updateConfig({ timerColor: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={config.timerColor}
                onChange={(e) => updateConfig({ timerColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timerTextColor">Timer Text Color</Label>
            <div className="flex gap-2">
              <Input
                id="timerTextColor"
                type="color"
                value={config.timerTextColor}
                onChange={(e) => updateConfig({ timerTextColor: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={config.timerTextColor}
                onChange={(e) => updateConfig({ timerTextColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button Configuration</CardTitle>
          <CardDescription>Customize the call-to-action button</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showButton">Show Button</Label>
            <Switch
              id="showButton"
              checked={config.showButton}
              onCheckedChange={(checked) => updateConfig({ showButton: checked })}
            />
          </div>

          {config.showButton && (
            <>
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={config.buttonText}
                  onChange={(e) => updateConfig({ buttonText: e.target.value })}
                  placeholder="Enter button text"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonUrl">Button URL</Label>
                <Input
                  id="buttonUrl"
                  type="url"
                  value={config.buttonUrl}
                  onChange={(e) => updateConfig({ buttonUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              {/* {config.layout === "centered" && (
                <div className="space-y-2">
                  <Label htmlFor="buttonPosition">Button Position</Label>
                  <Select
                    value={config.buttonPosition}
                    onValueChange={(value: any) => updateConfig({ buttonPosition: value })}
                  >
                    <SelectTrigger id="buttonPosition">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )} */}

              <div className="space-y-2">
                <Label htmlFor="buttonFont">Button Font Family</Label>
                <Select value={config.buttonFont} onValueChange={(value) => handleFontChange(value, "button")}>
                  <SelectTrigger id="buttonFont">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {fontCategories.map((category) => (
                      <div key={category}>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{category}</div>
                        {getFontsByCategory(category).map((font) => (
                          <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                            {font.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="showButtonShadow">Button Shadow</Label>
                <Switch
                  id="showButtonShadow"
                  checked={config.showButtonShadow}
                  onCheckedChange={(checked) => updateConfig({ showButtonShadow: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonColor">Button Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="buttonColor"
                    type="color"
                    value={config.buttonColor}
                    onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.buttonColor}
                    onChange={(e) => updateConfig({ buttonColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonTextColor">Button Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="buttonTextColor"
                    type="color"
                    value={config.buttonTextColor}
                    onChange={(e) => updateConfig({ buttonTextColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.buttonTextColor}
                    onChange={(e) => updateConfig({ buttonTextColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonHoverColor">Button Hover Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="buttonHoverColor"
                    type="color"
                    value={config.buttonHoverColor}
                    onChange={(e) => updateConfig({ buttonHoverColor: e.target.value })}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={config.buttonHoverColor}
                    onChange={(e) => updateConfig({ buttonHoverColor: e.target.value })}
                    className="flex-1"
                  />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="buttonTextAnimation">Button Text Animation</Label>
                <Select
                  value={config.buttonTextAnimation}
                  onValueChange={(value: any) => updateConfig({ buttonTextAnimation: value })}
                >
                  <SelectTrigger id="buttonTextAnimation">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="glitch">Glitch</SelectItem>
                    <SelectItem value="fade">Fade In</SelectItem>
                    <SelectItem value="pulse">Pulse</SelectItem>
                    <SelectItem value="wave">Wave</SelectItem>
                    <SelectItem value="typewriter">Typewriter</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Animation effect for the button text</p>
              </div>

              {config.buttonTextAnimation !== "none" && (
                <div className="space-y-2">
                  <Label htmlFor="buttonTextAnimationDuration">Animation Repeat Interval (seconds)</Label>
                  <Input
                    id="buttonTextAnimationDuration"
                    type="number"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={config.buttonTextAnimationDuration}
                    onChange={(e) => updateConfig({ buttonTextAnimationDuration: Number(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">How long to wait before repeating the animation</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Background</CardTitle>
          <CardDescription>Set background color or image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex gap-2">
              <Input
                id="backgroundColor"
                type="color"
                value={config.backgroundColor}
                onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundImage">Background Image</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => document.getElementById("backgroundImage")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <input
                id="backgroundImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {config.backgroundImage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateConfig({ backgroundImage: null })}
                className="w-full"
              >
                Remove Image
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom CSS</CardTitle>
          <CardDescription>Add custom CSS styling for advanced customization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customTextCSS">Text Custom CSS</Label>
            <Textarea
              id="customTextCSS"
              value={config.customTextCSS}
              onChange={(e) => updateConfig({ customTextCSS: e.target.value })}
              placeholder="font-size: 48px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
              rows={3}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Add CSS properties for the heading text (e.g., font-size, text-shadow, letter-spacing)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customTimerCSS">Timer Custom CSS</Label>
            <Textarea
              id="customTimerCSS"
              value={config.customTimerCSS}
              onChange={(e) => updateConfig({ customTimerCSS: e.target.value })}
              placeholder="border: 2px solid #000; transform: scale(1.1);"
              rows={3}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Add CSS properties for timer boxes (e.g., border, transform, box-shadow)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customButtonCSS">Button Custom CSS</Label>
            <Textarea
              id="customButtonCSS"
              value={config.customButtonCSS}
              onChange={(e) => updateConfig({ customButtonCSS: e.target.value })}
              placeholder="border-radius: 50px; text-transform: uppercase; letter-spacing: 2px;"
              rows={3}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Add CSS properties for the button (e.g., border-radius, text-transform, letter-spacing)
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSaveConfig} className="w-full" size="lg">
        <Download className="w-4 h-4 mr-2" />
        Save Configuration
      </Button>
    </div>
  )
}
