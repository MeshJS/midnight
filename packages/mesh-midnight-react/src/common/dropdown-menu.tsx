import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "./cn"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "mesh-flex mesh-cursor-default mesh-gap-2 mesh-select-none mesh-items-center mesh-rounded-sm mesh-px-2 mesh-py-1.5 mesh-text-sm mesh-outline-none focus:mesh-bg-accent data-[state=open]:mesh-bg-accent [&_svg]:mesh-pointer-events-none [&_svg]:mesh-size-4 [&_svg]:mesh-shrink-0",
      inset && "mesh-pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="mesh-ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "mesh-z-50 mesh-min-w-[8rem] mesh-overflow-hidden mesh-rounded-md mesh-border mesh-bg-popover mesh-p-1 mesh-text-popover-foreground mesh-shadow-lg data-[state=open]:mesh-animate-in data-[state=closed]:mesh-animate-out data-[state=closed]:mesh-fade-out-0 data-[state=open]:mesh-fade-in-0 data-[state=closed]:mesh-zoom-out-95 data-[state=open]:mesh-zoom-in-95 data-[side=bottom]:mesh-slide-in-from-top-2 data-[side=left]:mesh-slide-in-from-right-2 data-[side=right]:mesh-slide-in-from-left-2 data-[side=top]:mesh-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "mesh-z-50 mesh-min-w-[8rem] mesh-overflow-hidden mesh-rounded-md mesh-border mesh-bg-popover mesh-p-1 mesh-text-popover-foreground mesh-shadow-md",
        "data-[state=open]:mesh-animate-in data-[state=closed]:mesh-animate-out data-[state=closed]:mesh-fade-out-0 data-[state=open]:mesh-fade-in-0 data-[state=closed]:mesh-zoom-out-95 data-[state=open]:mesh-zoom-in-95 data-[side=bottom]:mesh-slide-in-from-top-2 data-[side=left]:mesh-slide-in-from-right-2 data-[side=right]:mesh-slide-in-from-left-2 data-[side=top]:mesh-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "mesh-relative mesh-flex mesh-cursor-default mesh-select-none mesh-items-center mesh-gap-2 mesh-rounded-sm mesh-px-2 mesh-py-1.5 mesh-text-sm mesh-outline-none mesh-transition-colors focus:mesh-bg-accent focus:mesh-text-accent-foreground data-[disabled]:mesh-pointer-events-none data-[disabled]:mesh-opacity-50 [&>svg]:mesh-size-4 [&>svg]:mesh-shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "mesh-relative mesh-flex mesh-cursor-default mesh-select-none mesh-items-center mesh-rounded-sm mesh-py-1.5 mesh-pl-8 mesh-pr-2 mesh-text-sm mesh-outline-none mesh-transition-colors focus:mesh-bg-accent focus:mesh-text-accent-foreground data-[disabled]:mesh-pointer-events-none data-[disabled]:mesh-opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="mesh-absolute mesh-left-2 mesh-flex mesh-h-3.5 mesh-w-3.5 mesh-items-center mesh-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="mesh-h-4 mesh-w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "mesh-relative mesh-flex mesh-cursor-default mesh-select-none mesh-items-center mesh-rounded-sm mesh-py-1.5 mesh-pl-8 mesh-pr-2 mesh-text-sm mesh-outline-none mesh-transition-colors focus:mesh-bg-accent focus:mesh-text-accent-foreground data-[disabled]:mesh-pointer-events-none data-[disabled]:mesh-opacity-50",
      className
    )}
    {...props}
  >
    <span className="mesh-absolute mesh-left-2 mesh-flex mesh-h-3.5 mesh-w-3.5 mesh-items-center mesh-justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="mesh-h-2 mesh-w-2 mesh-fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "mesh-px-2 mesh-py-1.5 mesh-text-sm mesh-font-semibold",
      inset && "mesh-pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("mesh--mx-1 mesh-my-1 mesh-h-px mesh-bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("mesh-ml-auto mesh-text-xs mesh-tracking-widest mesh-opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}