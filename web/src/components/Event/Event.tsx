import { EventQuery } from 'types/graphql'

import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader/SectionHeader'

interface IEventProps {
  event: EventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  const { name, type, description, location } = event
  return (
    <>
      <SimplePageHeader title={name} subtitle={type} />
      <div>
        <p className="text-base text-gray-500">{description}</p>
      </div>
      <SectionHeader title="Venue info" />
      <div>{location.business.name}</div>
      <div>{location.address}</div>
      <div className="mt-10 h-56 w-full overflow-clip rounded-md">
        <MapView lat={location.latitude} long={location.longitude} zoom={17} />
      </div>
    </>
  )
}

export default Event
