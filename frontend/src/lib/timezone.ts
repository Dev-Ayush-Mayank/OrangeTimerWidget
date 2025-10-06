export interface Timezone {
  value: string;
  label: string;
  offset: string;
}

export const timezones: Timezone[] = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)", offset: "+00:00" },
  {
    value: "America/New_York",
    label: "Eastern Time (ET)",
    offset: "-05:00/-04:00",
  },
  {
    value: "America/Chicago",
    label: "Central Time (CT)",
    offset: "-06:00/-05:00",
  },
  {
    value: "America/Denver",
    label: "Mountain Time (MT)",
    offset: "-07:00/-06:00",
  },
  {
    value: "America/Los_Angeles",
    label: "Pacific Time (PT)",
    offset: "-08:00/-07:00",
  },
  {
    value: "America/Anchorage",
    label: "Alaska Time (AKT)",
    offset: "-09:00/-08:00",
  },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HST)", offset: "-10:00" },
  {
    value: "Europe/London",
    label: "London (GMT/BST)",
    offset: "+00:00/+01:00",
  },
  { value: "Europe/Paris", label: "Paris (CET/CEST)", offset: "+01:00/+02:00" },
  {
    value: "Europe/Berlin",
    label: "Berlin (CET/CEST)",
    offset: "+01:00/+02:00",
  },
  { value: "Europe/Rome", label: "Rome (CET/CEST)", offset: "+01:00/+02:00" },
  {
    value: "Europe/Madrid",
    label: "Madrid (CET/CEST)",
    offset: "+01:00/+02:00",
  },
  {
    value: "Europe/Athens",
    label: "Athens (EET/EEST)",
    offset: "+02:00/+03:00",
  },
  { value: "Europe/Moscow", label: "Moscow (MSK)", offset: "+03:00" },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: "+04:00" },
  { value: "Asia/Karachi", label: "Karachi (PKT)", offset: "+05:00" },
  { value: "Asia/Kolkata", label: "India (IST)", offset: "+05:30" },
  { value: "Asia/Dhaka", label: "Dhaka (BST)", offset: "+06:00" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)", offset: "+07:00" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", offset: "+08:00" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", offset: "+08:00" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: "+08:00" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: "+09:00" },
  { value: "Asia/Seoul", label: "Seoul (KST)", offset: "+09:00" },
  {
    value: "Australia/Sydney",
    label: "Sydney (AEDT/AEST)",
    offset: "+10:00/+11:00",
  },
  {
    value: "Australia/Melbourne",
    label: "Melbourne (AEDT/AEST)",
    offset: "+10:00/+11:00",
  },
  {
    value: "Pacific/Auckland",
    label: "Auckland (NZDT/NZST)",
    offset: "+12:00/+13:00",
  },
  { value: "America/Toronto", label: "Toronto (ET)", offset: "-05:00/-04:00" },
  {
    value: "America/Vancouver",
    label: "Vancouver (PT)",
    offset: "-08:00/-07:00",
  },
  {
    value: "America/Mexico_City",
    label: "Mexico City (CST)",
    offset: "-06:00/-05:00",
  },
  { value: "America/Sao_Paulo", label: "São Paulo (BRT)", offset: "-03:00" },
  {
    value: "America/Buenos_Aires",
    label: "Buenos Aires (ART)",
    offset: "-03:00",
  },
  { value: "Africa/Cairo", label: "Cairo (EET)", offset: "+02:00" },
  {
    value: "Africa/Johannesburg",
    label: "Johannesburg (SAST)",
    offset: "+02:00",
  },
  { value: "Africa/Lagos", label: "Lagos (WAT)", offset: "+01:00" },
];
