import { GetPlaceVibesQuery } from 'types/graphql'

import EventCard from '../EventCard/EventCard'
import HorizontalSnapScroll from '../HorizontalSnapScroll/HorizontalSnapScroll'
import SectionHeader from '../SectionHeader'

interface IVibesProps {
  placeVibes: GetPlaceVibesQuery['placeVibes']
  locationName: string
  withPadding?: boolean
}

const Vibes = ({ placeVibes, locationName, withPadding }: IVibesProps) => {
  const placeVibeCards = placeVibes.map((vibe) => {
    return <EventCard hideBadges key={vibe.id} event={vibe} />
  })
  return (
    <section>
      <SectionHeader
        withPadding={withPadding}
        title="Curated event suggestions"
        subtitle={`We're curating these for ${locationName}. To express interest or see more information, just tap on it!`}
      />
      <div className="h-full w-full">
        <HorizontalSnapScroll items={[...placeVibeCards]} />
      </div>
    </section>
  )
}

export default Vibes
