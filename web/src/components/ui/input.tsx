import * as React from 'react'

import { InputFieldProps, TextField as RWTextField } from '@redwoodjs/forms'

import { cn } from 'src/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const BASE_INPUT_CLASS =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' as const

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(BASE_INPUT_CLASS, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

const TextField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, name, ...props }, ref) => {
    return (
      <RWTextField
        name={name}
        className={cn(BASE_INPUT_CLASS, className)}
        ref={ref}
        {...props}
      />
    )
  }
)

export { Input, TextField }
