import React from 'react'

interface IHorizontalSnapScrollProps {
  items: any[]
}

const HorizontalSnapScroll = ({ items }: IHorizontalSnapScrollProps) => {
  return (
    <div className="flex snap-x snap-mandatory gap-6 overflow-x-scroll">
      {items.map((item, index) => (
        <div key={index} className="shrink-0 snap-start">
          {item}
        </div>
      ))}
    </div>
  )
}

export default HorizontalSnapScroll
