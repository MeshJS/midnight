import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./cn"

const buttonVariants = cva(
  "mesh-inline-flex mesh-items-center mesh-justify-center mesh-gap-2 mesh-whitespace-nowrap mesh-rounded-md mesh-text-sm mesh-font-medium mesh-transition-colors focus-visible:mesh-outline-none disabled:mesh-pointer-events-none disabled:mesh-opacity-50 [&_svg]:mesh-pointer-events-none [&_svg]:mesh-size-4 [&_svg]:mesh-shrink-0",
  {
    variants: {
      variant: {
        default:
          "mesh-bg-primary mesh-text-primary-foreground mesh-shadow hover:mesh-bg-primary/90",
        destructive:
          "mesh-bg-destructive mesh-text-destructive-foreground mesh-shadow-sm hover:mesh-bg-destructive/90",
        outline:
          "mesh-border mesh-border-input mesh-bg-background mesh-shadow-sm hover:mesh-bg-accent hover:mesh-text-accent-foreground",
        secondary:
          "mesh-bg-secondary mesh-text-secondary-foreground mesh-shadow-sm hover:mesh-bg-secondary/80",
        ghost: "hover:mesh-bg-accent hover:mesh-text-accent-foreground",
        link: "mesh-text-primary mesh-underline-offset-4 hover:mesh-underline",
      },
      size: {
        default: "mesh-h-9 mesh-px-4 mesh-py-2",
        sm: "mesh-h-8 mesh-rounded-md mesh-px-3 mesh-text-xs",
        lg: "mesh-h-10 mesh-rounded-md mesh-px-8",
        icon: "mesh-h-9 mesh-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
