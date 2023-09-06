import React, { useRef, useState } from 'react'

import { CalendarIcon } from 'lucide-react'
import {
  AriaDialogProps,
  CalendarProps,
  DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from 'react-aria'
import {
  DatePickerState,
  DatePickerStateOptions,
  useDatePickerState,
} from 'react-stately'

import { useForwardedRef } from 'src/lib/useForwardedRef'
import { cn } from 'src/lib/utils'

import { Button } from '../button'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'

import { Calendar } from './calendar'
import { DateField } from './date-field'
import { TimeField } from './time-field'

interface IDateTimePickerContent {
  dialogProps: AriaDialogProps
  calendarProps: CalendarProps<DateValue>
  state: DatePickerState
}

const DateTimePickerContent = ({
  dialogProps,
  calendarProps,
  state,
}: IDateTimePickerContent) => (
  <div {...dialogProps} className="space-y-3">
    <Calendar {...calendarProps} />
    {!!state.hasTime && (
      <TimeField value={state.timeValue} onChange={state.setTimeValue} />
    )}
  </div>
)

interface IDateTimePickerProps extends DatePickerStateOptions<DateValue> {
  inline?: boolean
}

const DateTimePicker = React.forwardRef<HTMLDivElement, IDateTimePickerProps>(
  ({ inline, ...props }, forwardedRef) => {
    const ref = useForwardedRef(forwardedRef)
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = useState(false)

    const state = useDatePickerState(props)
    const {
      groupProps,
      fieldProps,
      buttonProps: _buttonProps,
      dialogProps,
      calendarProps,
    } = useDatePicker(props, state, ref)
    const { buttonProps } = useButton(_buttonProps, buttonRef)
    useInteractOutside({
      ref: contentRef,
      onInteractOutside: (_e) => {
        setOpen(false)
      },
    })

    if (inline) {
      return (
        <DateTimePickerContent
          dialogProps={dialogProps}
          calendarProps={calendarProps}
          state={state}
        />
      )
    } else {
      return (
        <div
          {...groupProps}
          ref={ref}
          className={cn(
            groupProps.className,
            'flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'
          )}
        >
          <DateField {...fieldProps} />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                {...buttonProps}
                variant="outline"
                className="rounded-l-none"
                disabled={props.isDisabled}
                onClick={() => setOpen(true)}
              >
                <CalendarIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent ref={contentRef} className="w-full">
              <DateTimePickerContent
                dialogProps={dialogProps}
                calendarProps={calendarProps}
                state={state}
              />
            </PopoverContent>
          </Popover>
        </div>
      )
    }
  }
)

DateTimePicker.displayName = 'DateTimePicker'

export { DateTimePicker }
