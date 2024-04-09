import React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cn } from '@/lib/utils'

const Provider = ToastPrimitives.Provider
const ClosePrimitive = ToastPrimitives.Close

export type ToastPositionType =
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
interface ViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {}
const Viewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  ViewportProps
>((props, ref) => <ToastPrimitives.Viewport ref={ref} {...props} />)
Viewport.displayName = ToastPrimitives.Viewport.displayName
const baseStyle =
  'p-6 pr-8 shadow-lg m-4 last:mt-0 sm:last:mt-4 border dark:border-slate-700 rounded-md flex w-full items-center justify-between space-x-4 overflow-hidden'
const PRIMARY_STYLE =
  'data-[swipe=move]:transition-none grow pointer-events-auto'

const POSITION_MAP = {
  'bottom-center': `
    data-[swipe=move]:!translate-y-[var(--radix-toast-swipe-move-y)] data-[swipe=move]:-translate-x-1/2 data-[swipe=cancel]:-translate-x-1/2 data-[swipe=end]:!opacity-0
    top-auto bottom-0 left-1/2
    data-[state=open]:animate-in-bottom-center
    data-[state=closed]:animate-out-bottom-center
  `,
  'bottom-right':
    'transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
  'bottom-left':
    'transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-left-full',
  'top-center':
    'transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-top-full data-[state=open]:[--tw-enter-translate-x:-50%] data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-top-full data-[state=closed]:[--tw-exit-translate-x:-50%]',
  'top-left':
    'transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-left-full',
  'top-right':
    'transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
  'middle-left':
    'transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-top-full data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
  'middle-right': `
    transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:animate-out
    data-[state=open]:animate-in-right
    data-[state=closed]:animate-out-right
  `,
} satisfies Record<ToastPositionType, string>

type ToastVariantType = 'default' | 'destructive' | 'clear'

export const VARIANT_MAP = {
  default: [
    'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700',
    baseStyle,
  ],
  destructive: [
    'bg-red-600 text-white border-red-600 dark:border-red-600',
    baseStyle,
  ],
  clear: ['bg-transparent border-transparent'],
} satisfies Record<ToastVariantType, string[]>

interface ToastVariants
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: ToastVariantType
  position?: ToastPositionType
  modalOver?: boolean
}

const Root = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastVariants
>(
  (
    {
      variant = 'default',
      position = 'bottom-right',
      modalOver = false,
      className,
      ...props
    },
    ref
  ) => (
    <ToastPrimitives.Root
      ref={ref}
      data-position={position}
      className={cn(
        'group',
        PRIMARY_STYLE,
        VARIANT_MAP[variant],
        POSITION_MAP[position],
        className
      )}
      asChild
      {...props}
    >
      <div
        className={cn(
          'fixed top-0 flex max-h-screen flex-col-reverse p-4 sm:flex-col !w-auto',
          position === 'bottom-left' && 'sm:top-auto sm:bottom-0 sm:left-0',
          position === 'bottom-right' && 'sm:top-auto sm:bottom-0 sm:right-0',
          position === 'top-center' &&
            'sm:top-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2',
          position === 'top-left' && 'sm:top-0 sm:bottom-auto sm:left-0',
          position === 'top-right' && 'sm:top-0 sm:bottom-auto sm:right-0',
          position === 'middle-right' &&
            'sm:top-1/2 sm:bottom-1/2 sm:right-0',
          modalOver ? 'z-[51]' : 'z-[49]'
        )}
        children={props.children}
      />
    </ToastPrimitives.Root>
  )
)
Root.displayName = ToastPrimitives.Root.displayName

const Action = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-red-100 group-[.destructive]:hover:border-slate-50 group-[.destructive]:hover:bg-red-100 group-[.destructive]:hover:text-red-600 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800',
      className
    )}
    {...props}
  />
))
Action.displayName = ToastPrimitives.Action.displayName

const Close = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute top-2 right-2 rounded-md p-1 text-slate-500 opacity-0 transition-opacity hover:text-slate-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600 dark:hover:text-slate-50',
      className
    )}
    toast-close=""
    {...props}
  >
    x
  </ToastPrimitives.Close>
))
Close.displayName = ToastPrimitives.Close.displayName

const Title = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className="text-sm font-semibold"
    {...props}
  />
))
Title.displayName = ToastPrimitives.Title.displayName

const Description = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className="text-sm opacity-90"
    {...props}
  />
))
Description.displayName = ToastPrimitives.Description.displayName

type ToastRootProps = React.ComponentPropsWithoutRef<typeof Root>

type ToastActionElement = React.ReactElement<typeof Action>

export {
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Close,
  ClosePrimitive,
  Action,
  VARIANT_MAP as TOAST_VARIANT_MAP,
}
export type {
  ToastRootProps,
  ToastActionElement,
  ToastVariantType,
  ToastVariants,
}
