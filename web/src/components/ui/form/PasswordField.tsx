import { PasswordField as RWPasswordField } from '@redwoodjs/forms'

import { cn } from 'src/lib/utils'

import StyledFieldWrapper, { StyledFieldProps } from './FieldWrapper'

const PasswordField = React.forwardRef<HTMLInputElement, StyledFieldProps>(
  (
    {
      name,
      label,
      defaultValue,
      onChange,
      onKeyDown,
      validation,
      maxLength,
      currentLength,
      placeholder,
      disabled,
      grow,
      inline = false,
      markOptional,
      endComponent,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <StyledFieldWrapper
        label={label}
        name={name}
        maxLength={maxLength}
        currentLength={currentLength}
        inline={inline}
        markOptional={markOptional}
        endComponent={endComponent}
      >
        <RWPasswordField
          ref={ref}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={cn('input', className, grow && 'md:text-lg')}
          validation={validation}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          {...props}
        />
      </StyledFieldWrapper>
    )
  }
)

export default PasswordField
