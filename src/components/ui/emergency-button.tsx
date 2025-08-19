import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emergencyButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xl font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        emergency: "bg-emergency text-emergency-foreground hover:bg-emergency/90 emergency-pulse emergency-glow shadow-2xl",
        success: "bg-success text-success-foreground hover:bg-success/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-32 w-32 px-8 py-8",
        lg: "h-40 w-40 px-12 py-12 text-2xl",
        xl: "h-48 w-48 px-16 py-16 text-3xl",
      },
    },
    defaultVariants: {
      variant: "emergency",
      size: "lg",
    },
  }
)

export interface EmergencyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof emergencyButtonVariants> {}

const EmergencyButton = React.forwardRef<HTMLButtonElement, EmergencyButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(emergencyButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
EmergencyButton.displayName = "EmergencyButton"

export { EmergencyButton, emergencyButtonVariants }