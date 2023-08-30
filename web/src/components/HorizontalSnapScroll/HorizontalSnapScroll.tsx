import React from 'react'

interface IHorizontalSnapScrollProps {
  items: any[]
}

const HorizontalSnapScroll = ({ items }: IHorizontalSnapScrollProps) => {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-1 overflow-x-scroll pb-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="h-60 w-[17rem] shrink-0 snap-start pl-[1rem] sm:h-72 sm:w-[30rem] sm:pl-[5rem]"
        >
          {item}
        </div>
      ))}
      {/* This is needed to allow for the item at the end to not be stuck at the end */}
      <div className="w-[calc(100%-17.5rem)] shrink-0 snap-start sm:w-[calc(100%-30.5rem)]" />
    </div>
  )
}

export default HorizontalSnapScroll
