import React from 'react'

interface IHorizontalSnapScrollProps {
  items: any[]
}

const HorizontalSnapScroll = ({ items }: IHorizontalSnapScrollProps) => {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-scroll">
      {items.map((item, index) => (
        <div
          key={index}
          className="h-60 w-64 shrink-0 snap-start overflow-y-scroll sm:h-72 sm:w-96"
        >
          {item}
        </div>
      ))}
      {/* This is needed to allow for the item at the end to not be stuck at the end */}
      <div className="w-[calc(100%-16rem-1.5rem)] shrink-0 snap-start sm:w-[calc(100%-24rem-1.5rem)]" />
    </div>
  )
}

export default HorizontalSnapScroll
