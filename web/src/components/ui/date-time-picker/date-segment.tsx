import { useRef } from 'react'

import { useDateSegment } from 'react-aria'
import { DateFieldState, DateSegment as IDateSegment } from 'react-stately'

import { cn } from 'src/lib/utils'

interface DateSegmentProps {
  segment: IDateSegment
  state: DateFieldState
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null)

  const {
    segmentProps: { ...segmentProps },
  } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      aria-label={segment.text}
      className={cn(
        'focus:rounded-[2px] focus:bg-accent focus:text-gray-900 focus:outline-none',
        segment.type !== 'literal' ? 'px-[1px]' : '',
        segment.isPlaceholder ? 'text-muted-foreground' : ''
      )}
    >
      {segment.text}
    </div>
  )
}

export { DateSegment }
