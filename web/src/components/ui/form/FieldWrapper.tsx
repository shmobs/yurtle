import { useAutoAnimate } from '@formkit/auto-animate/react'

import { FieldError, InputFieldProps, Label } from '@redwoodjs/forms'

import { cn } from 'src/lib/utils'

/** Use this to type any props that are children of `StyledFieldWrapper` */
export interface StyledFieldProps
  extends Omit<StyledFieldWrapperProps, 'children'>,
    InputFieldProps {
  defaultValue?: string | number | readonly string[]
  placeholder?: string
  disabled?: boolean
}

export interface StyledFieldWrapperProps {
  children: JSX.Element
  /** Identifier name for this field */
  name: string
  /** Visual name for this field */
  label?: string
  /** Maximum length of the text in the field */
  maxLength?: number
  /** Current length of the text in the field. Must include if using maxLength */
  currentLength?: number
  /** Use this to make the field grow larger on larger screens */
  grow?: boolean
  /** Use this to make the field inline */
  inline?: boolean
  /** Use this to mark that the field is optional */
  markOptional?: boolean
  /** Use this to include a custom component that will be placed inside the input, at the end */
  endComponent?: JSX.Element
}
const StyledFieldWrapper = ({
  children,
  name,
  label,
  maxLength,
  currentLength,
  inline = false,
  markOptional = false,
  endComponent,
}: StyledFieldWrapperProps) => {
  const [animationParentRef] = useAutoAnimate()
  return (
    <div
      ref={animationParentRef}
      className={cn('text-left', inline ? 'mr-10 flex-1' : 'mb-3')}
    >
      {label && (
        <Label
          name={name}
          className="block text-sm font-medium text-gray-700"
          errorClassName="block text-sm font-medium text-red-600"
        >
          {label}
          {markOptional && (
            <span className="text-xs uppercase text-gray-400"> - optional</span>
          )}
        </Label>
      )}
      <div className={cn(!!label && 'mt-1', 'relative rounded-md shadow-sm')}>
        {children}
        <div className="absolute bottom-0 right-2 top-[50%] -translate-y-1/2">
          {endComponent}
        </div>
        {maxLength !== undefined && currentLength !== undefined && (
          <div className="pointer-events-none absolute -inset-y-0 -right-4 flex w-2 items-center text-left text-sm text-gray-400">
            {maxLength - currentLength}
          </div>
        )}
      </div>
      {!inline && (
        <FieldError name={name} className="mt-2 text-sm text-red-600" />
      )}
    </div>
  )
}

export default StyledFieldWrapper
