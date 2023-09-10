import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from 'src/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        gray: 'bg-gray-100 text-gray-600',
        red: 'bg-red-100 text-red-700',
        yellow: 'bg-yellow-100 text-yellow-800',
        green: 'bg-green-100 text-green-700',
        blue: 'bg-blue-100 text-blue-700',
        indigo: 'bg-indigo-100 text-indigo-700',
        purple: 'bg-purple-100 text-purple-700',
        pink: 'bg-pink-100 text-pink-700',
        loading: "loading"
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
