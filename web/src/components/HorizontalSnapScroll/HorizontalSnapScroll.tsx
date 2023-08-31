import React from 'react'

import { cn } from 'src/lib/utils'

interface IHorizontalSnapScrollProps {
  items: any[]
}

const HorizontalSnapScroll = ({ items }: IHorizontalSnapScrollProps) => {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-1 overflow-x-scroll pb-3 sm:gap-0">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'h-60 w-[17rem] shrink-0 snap-start pl-[1rem] sm:h-56',
            index === 0
              ? 'sm:w-[29rem] sm:pl-[6rem]'
              : 'sm:w-[26rem] sm:pl-[3rem]'
          )}
        >
          {item}
        </div>
      ))}
      {/* This is needed to allow for the item at the end to not be stuck at the end */}
      <div className="w-[calc(100%-17.5rem)] shrink-0 snap-start sm:w-[calc(100%-26rem)]" />
    </div>
  )
}

export default HorizontalSnapScroll
