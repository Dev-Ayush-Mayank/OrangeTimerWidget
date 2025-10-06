import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { TimerConfig } from "../lib/timer"
import { loadGoogleFont } from "../lib/GoogleFonts"

interface TimerPreviewProps {
  config: TimerConfig
}

export function TimerPreview({ config }: TimerPreviewProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [prevTimeLeft, setPrevTimeLeft] = useState(timeLeft)
  const [currentNumber, setCurrentNumber] = useState(config.startNumber)
  const [isBannerClosed, setIsBannerClosed] = useState(false)

  useEffect(() => {
    if (config.timerType === "countdown") {
      const calculateTimeLeft = () => {
        const targetDate = new Date(config.targetDate)
        const nowInTimezone = new Date(new Date().toLocaleString("en-US", { timeZone: config.timezone }))
        const targetInTimezone = new Date(targetDate.toLocaleString("en-US", { timeZone: config.timezone }))
        const difference = targetInTimezone.getTime() - nowInTimezone.getTime()

        if (difference > 0) {
          const newTimeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }
          setPrevTimeLeft(timeLeft)
          setTimeLeft(newTimeLeft)
        } else {
          setPrevTimeLeft(timeLeft)
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      }

      calculateTimeLeft()
      const timer = setInterval(calculateTimeLeft, 1000)
      return () => clearInterval(timer)
    } else if (config.timerType === "visitor-countdown") {
      const STORAGE_KEY = "timer_visitor_start_time"

      const calculateVisitorTimeLeft = () => {
        let startTime = localStorage.getItem(STORAGE_KEY)

        if (!startTime) {
          startTime = Date.now().toString()
          localStorage.setItem(STORAGE_KEY, startTime)
        }

        const endTime = Number(startTime) + config.visitorCountdownDuration * 60 * 60 * 1000
        const difference = endTime - Date.now()

        if (difference > 0) {
          const newTimeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }
          setPrevTimeLeft(timeLeft)
          setTimeLeft(newTimeLeft)
        } else {
          setPrevTimeLeft(timeLeft)
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        }
      }

      calculateVisitorTimeLeft()
      const timer = setInterval(calculateVisitorTimeLeft, 1000)
      return () => clearInterval(timer)
    } else if (config.timerType === "number-counter") {
      const startTime = Date.now()
      const duration = config.counterDuration * 1000
      const range = config.endNumber - config.startNumber

      const updateCounter = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const newNumber = Math.floor(config.startNumber + range * progress)
        setCurrentNumber(newNumber)

        if (progress < 1) {
          requestAnimationFrame(updateCounter)
        }
      }

      updateCounter()
    }
  }, [
    config.targetDate,
    config.timerType,
    config.visitorCountdownDuration,
    config.startNumber,
    config.endNumber,
    config.counterDuration,
    config.timezone,
  ])

  useEffect(() => {
    if (config.textFont) {
      loadGoogleFont(config.textFont)
    }
    if (config.buttonFont) {
      loadGoogleFont(config.buttonFont)
    }
  }, [config.textFont, config.buttonFont])

  const getTimerStyleClasses = () => {
    switch (config.timerStyle) {
      case "circle":
        return "rounded-full aspect-square"
      case "square":
        return "rounded-none"
      case "rounded":
        return "rounded-xl"
      case "none":
        return "rounded-none border-0"
      default:
        return "rounded-xl"
    }
  }

  const getTextAnimationClass = () => {
    if (config.textAnimation === "none") return ""
    return `animate-text-${config.textAnimation}`
  }

  const getButtonTextAnimationClass = () => {
    if (config.buttonTextAnimation === "none") return ""
    return `animate-text-${config.buttonTextAnimation}`
  }

  const getAnimationClass = () => {
    switch (config.digitAnimation) {
      case "bounce":
        return "animate-bounce-digit"
      case "fade":
        return "animate-fade-digit"
      case "flip":
        return "animate-flip-digit"
      default:
        return ""
    }
  }

  const parseCustomCSS = (cssString: string): React.CSSProperties => {
    if (!cssString.trim()) return {}

    try {
      const styles: React.CSSProperties = {}
      const declarations = cssString.split(";").filter((d) => d.trim())

      declarations.forEach((declaration) => {
        const [property, value] = declaration.split(":").map((s) => s.trim())
        if (property && value) {
          const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
          styles[camelProperty as any] = value
        }
      })

      return styles
    } catch (error) {
      console.error("[v0] Error parsing custom CSS:", error)
      return {}
    }
  }

  const renderTimer = () => {
    if (config.timerType === "number-counter") {
      return (
        <div className="flex gap-4 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {String(currentNumber)
                .split("")
                .map((digit, i) => (
                  <div
                    key={`${i}-${digit}`}
                    className={`${getTimerStyleClasses()} w-16 h-20 flex items-center justify-center transition-all duration-300 ${
                      config.showTimerShadow ? "shadow-lg" : ""
                    } ${config.digitAnimation !== "slide" ? getAnimationClass() : ""} overflow-hidden`}
                    style={{
                      backgroundColor: config.timerColor,
                      ...parseCustomCSS(config.customTimerCSS),
                    }}
                  >
                    <span
                      className={`text-4xl font-bold ${config.digitAnimation === "slide" ? "animate-slide-digit" : ""}`}
                      style={{
                        color: config.timerTextColor,
                      }}
                    >
                      {digit}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="flex gap-4 items-center justify-center">
        {[
          { value: timeLeft.days, label: config.labelDays, showLabel: config.showDaysLabel, showUnit: config.showDays },
          {
            value: timeLeft.hours,
            label: config.labelHours,
            showLabel: config.showHoursLabel,
            showUnit: config.showHours,
          },
          {
            value: timeLeft.minutes,
            label: config.labelMinutes,
            showLabel: config.showMinutesLabel,
            showUnit: config.showMinutes,
          },
          {
            value: timeLeft.seconds,
            label: config.labelSeconds,
            showLabel: config.showSecondsLabel,
            showUnit: config.showSeconds,
          },
        ]
          .filter((unit) => unit.showUnit)
          .map((unit, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {String(unit.value)
                  .padStart(2, "0")
                  .split("")
                  .map((digit, i) => (
                    <div
                      key={`${index}-${i}-${digit}`}
                      className={`${getTimerStyleClasses()} w-16 h-20 flex items-center justify-center transition-all duration-300 ${
                        config.showTimerShadow ? "shadow-lg" : ""
                      } ${config.digitAnimation !== "slide" ? getAnimationClass() : ""} overflow-hidden`}
                      style={{
                        backgroundColor: config.timerColor,
                        ...parseCustomCSS(config.customTimerCSS),
                      }}
                    >
                      <span
                        className={`text-4xl font-bold ${config.digitAnimation === "slide" ? "animate-slide-digit" : ""}`}
                        style={{
                          color: config.timerTextColor,
                        }}
                      >
                        {digit}
                      </span>
                    </div>
                  ))}
              </div>
              {config.showLabels && unit.showLabel && (
                <span className="text-sm font-medium" style={{ color: config.textColor }}>
                  {unit.label}
                </span>
              )}
            </div>
          ))}
      </div>
    )
  }

  const getLayoutClasses = () => {
    if (config.textPosition === "right" || config.buttonPosition === "left") {
      return "flex-row items-center"
    }
    return "flex-col"
  }

  const renderBannerLayout = () => {
    if (isBannerClosed) return null

  const baseHeight = 80 // Base height in pixels
  const heightScale = config.bannerHeight / baseHeight
  const combinedScale = config.bannerScale * heightScale

    return (
      <div
        className={`fixed ${config.bannerPosition === "top" ? "top-0" : "bottom-0"} left-0 right-0 z-50 transition-all duration-300`}
        style={{
          backgroundColor: config.backgroundImage ? "transparent" : config.backgroundColor,
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: `${config.bannerHeight}px`,
        }}
      >
         <div
          className="container mx-auto px-6 h-full origin-center flex items-center"
          style={{
           transform: `scale(${combinedScale})`,
          }}
        >
          <div className="flex items-center justify-between gap-6 w-full">
            {/* Left side: Text */}
            <div className="flex-shrink-0" style={{ maxWidth: "360px" }}>
              <h2
                style={{
                  color: config.textColor,
                  fontFamily: config.textFont,
                  animationDuration: `${config.textAnimationDuration}s`,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineClamp: 2,
                  ...parseCustomCSS(config.customTextCSS),
                }}
                className={`text-xl font-bold leading-tight ${getTextAnimationClass()}`}
              >
                {config.text}
              </h2>
            </div>

            {/* Center: Timer */}
            <div className="flex-shrink-0">
              <div className="flex gap-2 items-center">
                {config.timerType === "number-counter" ? (
                  <div className="flex gap-1">
                    {String(currentNumber)
                      .split("")
                      .map((digit, i) => (
                        <div
                          key={`${i}-${digit}`}
                          className={`${getTimerStyleClasses()} w-12 h-14 flex items-center justify-center transition-all duration-300 ${
                            config.showTimerShadow ? "shadow-lg" : ""
                          } ${config.digitAnimation !== "slide" ? getAnimationClass() : ""} overflow-hidden`}
                          style={{
                            backgroundColor: config.timerColor,
                            ...parseCustomCSS(config.customTimerCSS),
                          }}
                        >
                          <span
                            className={`text-2xl font-bold ${config.digitAnimation === "slide" ? "animate-slide-digit" : ""}`}
                            style={{
                              color: config.timerTextColor,
                            }}
                          >
                            {digit}
                          </span>
                        </div>
                      ))}
                  </div>
                ) : (
                  [
                    {
                      value: timeLeft.days,
                      label: config.labelDays,
                      showLabel: config.showDaysLabel,
                      showUnit: config.showDays,
                    },
                    {
                      value: timeLeft.hours,
                      label: config.labelHours,
                      showLabel: config.showHoursLabel,
                      showUnit: config.showHours,
                    },
                    {
                      value: timeLeft.minutes,
                      label: config.labelMinutes,
                      showLabel: config.showMinutesLabel,
                      showUnit: config.showMinutes,
                    },
                    {
                      value: timeLeft.seconds,
                      label: config.labelSeconds,
                      showLabel: config.showSecondsLabel,
                      showUnit: config.showSeconds,
                    },
                  ]
                    .filter((unit) => unit.showUnit)
                    .map((unit, index) => (
                      <div key={index} className="flex flex-col items-center gap-1">
                        <div className="flex gap-1">
                          {String(unit.value)
                            .padStart(2, "0")
                            .split("")
                            .map((digit, i) => (
                              <div
                                key={`${index}-${i}-${digit}`}
                                className={`${getTimerStyleClasses()} w-12 h-14 flex items-center justify-center transition-all duration-300 ${
                                  config.showTimerShadow ? "shadow-lg" : ""
                                } ${config.digitAnimation !== "slide" ? getAnimationClass() : ""} overflow-hidden`}
                                style={{
                                  backgroundColor: config.timerColor,
                                  ...parseCustomCSS(config.customTimerCSS),
                                }}
                              >
                                <span
                                  className={`text-2xl font-bold ${config.digitAnimation === "slide" ? "animate-slide-digit" : ""}`}
                                  style={{
                                    color: config.timerTextColor,
                                  }}
                                >
                                  {digit}
                                </span>
                              </div>
                            ))}
                        </div>
                        {config.showLabels && unit.showLabel && (
                          <span className="text-xs font-medium" style={{ color: config.textColor }}>
                            {unit.label}
                          </span>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Right side: Button and Close */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {config.showButton && (
                <a
                  href={config.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                 className={`px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 ${
                    config.buttonFont
                  } ${config.showButtonShadow ? "shadow-lg" : ""}`}
                  style={{
                    backgroundColor: config.buttonColor,
                    color: config.buttonTextColor,
                    fontFamily: config.buttonFont,
                    ...parseCustomCSS(config.customButtonCSS),
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = config.buttonHoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = config.buttonColor
                  }}
                >
                  {config.buttonText}
                </a>
              )}

              {config.showCloseButton && (
                <button
                  onClick={() => setIsBannerClosed(true)}
                  className="p-2 hover:bg-black/10 rounded-lg transition-colors"
                  aria-label="Close banner"
                >
                  <X className="w-5 h-5" style={{ color: config.textColor }} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCenteredLayout = () => {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8 transition-all duration-300"
        style={{
          backgroundColor: config.backgroundImage ? "transparent" : config.backgroundColor,
          backgroundImage: config.backgroundImage ? `url(${config.backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`flex ${getLayoutClasses()} gap-8 max-w-6xl w-full`}>
          {(config.textPosition === "top" || config.textPosition === "right") && (
            <h1
              style={{
                color: config.textColor,
                fontFamily: config.textFont,
                animationDuration: `${config.textAnimationDuration}s`,
                ...parseCustomCSS(config.customTextCSS),
              }}
              className={`text-3xl font-bold ${getTextAnimationClass()}`}
            >
              {config.text}
            </h1>
          )}

          <div className="flex flex-col items-center gap-6">
            {config.showButton && config.buttonPosition === "left" && (
              <a
                href={config.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${
                  config.buttonFont
                } ${config.showButtonShadow ? "shadow-lg" : ""}`}
                style={{
                  backgroundColor: config.buttonColor,
                  color: config.buttonTextColor,
                  fontFamily: config.buttonFont,
                  ...parseCustomCSS(config.customButtonCSS),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = config.buttonHoverColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = config.buttonColor
                }}
              >
                {config.buttonText}
              </a>
            )}

            {renderTimer()}

            {config.showButton && config.buttonPosition === "bottom" && (
              <a
                href={config.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${
                  config.buttonFont
                } ${config.showButtonShadow ? "shadow-lg" : ""}`}
                style={{
                  backgroundColor: config.buttonColor,
                  color: config.buttonTextColor,
                  fontFamily: config.buttonFont,
                  ...parseCustomCSS(config.customButtonCSS),
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = config.buttonHoverColor
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = config.buttonColor
                }}
              >
                {config.buttonText}
              </a>
            )}
          </div>

          {config.textPosition === "bottom" && (
            <h1
              
              style={{
                color: config.textColor,
                fontFamily: config.textFont,
                animationDuration: `${config.textAnimationDuration}s`,
                ...parseCustomCSS(config.customTextCSS),
              }}
              className={`text-3xl font-bold ${getTextAnimationClass()}`}
            >
              {config.text}
            </h1>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes bounce-digit {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        
        @keyframes fade-digit {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes flip-digit {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
        
        @keyframes slide-digit {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        /* Updated text animation keyframes to repeat after duration */
        @keyframes text-glitch {
          0%, 100% { transform: translate(0); }
          2% { transform: translate(-2px, 2px); }
          4% { transform: translate(-2px, -2px); }
          6% { transform: translate(2px, 2px); }
          8% { transform: translate(2px, -2px); }
          10%, 100% { transform: translate(0); }
        }
        
        @keyframes text-fade {
          0% { opacity: 0; transform: translateY(-10px); }
          10% { opacity: 1; transform: translateY(0); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes text-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          5% { transform: scale(1.05); opacity: 0.8; }
          10%, 100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes text-wave {
          0%, 100% { transform: translateY(0); }
          2.5% { transform: translateY(-10px); }
          7.5% { transform: translateY(10px); }
          10%, 100% { transform: translateY(0); }
        }
        
        @keyframes text-typewriter {
          0% { width: 0; }
          10% { width: 100%; }
          100% { width: 100%; }
        }
        
        .animate-bounce-digit {
          animation: bounce-digit 0.5s ease-in-out;
        }
        
        .animate-fade-digit {
          animation: fade-digit 0.5s ease-in-out;
        }
        
        .animate-flip-digit {
          animation: flip-digit 0.6s ease-in-out;
          transform-style: preserve-3d;
        }
        
        .animate-slide-digit {
          animation: slide-digit 0.4s ease-out;
        }

         /* Updated text animation classes to use infinite with custom duration */
        .animate-text-glitch {
          animation: text-glitch infinite;
        }
        
        .animate-text-fade {
          animation: text-fade infinite ease-out;
        }
        
        .animate-text-pulse {
          animation: text-pulse infinite;
        }
        
        .animate-text-wave {
          animation: text-wave infinite ease-in-out;
        }
        
        .animate-text-typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: text-typewriter infinite steps(40, end);
        }
      `}</style>

      {config.layout === "banner" ? renderBannerLayout() : renderCenteredLayout()}
    </>
  )
}
