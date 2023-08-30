import React from 'react'

interface IHorizontalSnapScrollProps {
  items: any[]
}

const HorizontalSnapScroll = ({ items }: IHorizontalSnapScrollProps) => {
  return (
    <div className="flex snap-x snap-mandatory overflow-x-scroll">
      {items.map((item, index) => (
        <div key={index} className="w-full flex-none snap-start">
          {item}
        </div>
      ))}
    </div>
  )
}

export default HorizontalSnapScroll
