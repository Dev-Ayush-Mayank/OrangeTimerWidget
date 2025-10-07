import { Loader } from "lucide-react"

import { cn } from "@/lib/utils"

function Spinner({ className}: React.ComponentProps<"svg">) {
  return (
    <Loader className={cn("size-10 animate-spin", className)}/>
  )
}

export const SpinnerCustom = () => {
  return (
    <div className="flex items-center gap-4 justify-center h-screen">
      <Spinner />
    </div>
  )
}
