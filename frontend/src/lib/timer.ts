export interface TimerConfig {
  timerType: "countdown" | "visitor-countdown" | "number-counter"
  layout: "centered" | "banner"
  bannerPosition: "top" | "bottom"
  bannerScale: number
  bannerHeight: number
  showCloseButton: boolean
  text: string
  textPosition: "top" | "right" | "bottom"
  textAnimation: "none" | "glitch" | "fade" | "pulse" | "wave" | "typewriter"
  textAnimationDuration: number
  buttonText: string
  buttonPosition: "left" | "bottom"
  buttonUrl: string
  showButton: boolean
  buttonTextAnimation: "none" | "glitch" | "fade" | "pulse" | "wave" | "typewriter"
  buttonTextAnimationDuration: number
  targetDate: string
  timezone: string
  timerStyle: "circle" | "square" | "rounded" | "none"
  digitAnimation: "none" | "bounce" | "fade" | "flip" | "slide"
  timerSize: number
  backgroundColor: string
  backgroundImage: string | null
  textFont: string
  buttonFont: string
  textColor: string
  timerColor: string
  timerTextColor: string
  buttonColor: string
  buttonTextColor: string
  buttonHoverColor: string
  showLabels: boolean
  showDaysLabel: boolean
  showHoursLabel: boolean
  showMinutesLabel: boolean
  showSecondsLabel: boolean
  showDays: boolean
  showHours: boolean
  showMinutes: boolean
  showSeconds: boolean
  labelDays: string
  labelHours: string
  labelMinutes: string
  labelSeconds: string
  showTimerShadow: boolean
  showButtonShadow: boolean
  customTextCSS: string
  customButtonCSS: string
  customTimerCSS: string
  startNumber: number
  endNumber: number
  counterDuration: number
  visitorCountdownDuration: number
}
