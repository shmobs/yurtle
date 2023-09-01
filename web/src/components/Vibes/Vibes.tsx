import { GetPlaceVibesQuery } from 'types/graphql'

import EventCard from '../EventCard/EventCard'
import HorizontalSnapScroll from '../HorizontalSnapScroll/HorizontalSnapScroll'

interface IVibesProps {
  placeVibes: GetPlaceVibesQuery['placeVibes']
}

const Vibes = ({ placeVibes }: IVibesProps) => {
  const placeVibeCards = placeVibes.map((vibe) => {
    return (
      <EventCard
        key={vibe.id}
        eventId={vibe.id}
        name={vibe.name}
        type={vibe.type}
        description={vibe.description}
        isDraft
      />
    )
  })
  return (
    <div className="h-full w-full">
      <HorizontalSnapScroll items={[...placeVibeCards]} />
    </div>
  )
}

export default Vibes
