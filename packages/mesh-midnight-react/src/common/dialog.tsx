"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "./cn";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <div className="mesh-fixed mesh-inset-0">
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "mesh-fixed mesh-inset-0 mesh-z-10 mesh-bg-black/80 data-[state=open]:mesh-animate-in data-[state=closed]:mesh-animate-out data-[state=closed]:mesh-fade-out-0 data-[state=open]:mesh-fade-in-0",
        className,
      )}
      {...props}
    />
  </div>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <div className="mesh-fixed mesh-inset-0 mesh-pointer-events-none">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "mesh-absolute mesh-z-60 mesh-left-1/2 mesh-top-1/2 mesh-w-full mesh-max-w-lg mesh--translate-x-1/2 mesh--translate-y-1/2 mesh-grid mesh-gap-4 mesh-border mesh-bg-background2 mesh-text-foreground mesh-p-6 mesh-shadow-lg mesh-pointer-events-auto data-[state=open]:mesh-animate-in data-[state=closed]:mesh-animate-out data-[state=closed]:mesh-fade-out-0 data-[state=open]:mesh-fade-in-0 data-[state=closed]:mesh-zoom-out-95 data-[state=open]:mesh-zoom-in-95 data-[state=closed]:mesh-slide-out-to-left-1/2 data-[state=closed]:mesh-slide-out-to-top-[48%] data-[state=open]:mesh-slide-in-from-left-1/2 data-[state=open]:mesh-slide-in-from-top-[48%] sm:mesh-rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="mesh-absolute mesh-right-4 mesh-top-4 mesh-rounded-sm mesh-opacity-70 mesh-ring-offset-background mesh-transition-opacity mesh-hover:opacity-100 mesh-focus:outline-none mesh-focus:ring-2 mesh-focus:ring-ring mesh-focus:ring-offset-2 mesh-disabled:pointer-events-none data-[state=open]:mesh-bg-accent data-[state=open]:mesh-text-muted-foreground">
          <X className="mesh-h-4 mesh-w-4" />
          <span className="mesh-sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mesh-flex mesh-flex-col mesh-space-y-1.5 mesh-text-foreground mesh-text-center sm:mesh-text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mesh-flex mesh-flex-col-reverse sm:mesh-flex-row sm:mesh-justify-end sm:mesh-space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "mesh-text-lg mesh-font-semibold mesh-leading-none mesh-tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("mesh-text-sm mesh-text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
