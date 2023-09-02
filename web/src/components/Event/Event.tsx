import { ArrowRight } from 'lucide-react'
import { EventQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

import AddressLink from '../AddressLink/AddressLink'
import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface IEventProps {
  event: EventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  const { name, type, description, location } = event
  return (
    <>
      <SimplePageHeader title={name} subtitle={type} />
      <div>
        <div className="flex justify-between">
          <Badge variant="yellow">suggestion</Badge>
          <Button variant="outline">
            Create Request
            <ArrowRight />
          </Button>
        </div>
        <SectionHeader
          title={
            <span>
              Hosted by{' '}
              <Link
                to={routes.business({ id: location.business.id })}
                className="link"
              >
                {location.business.name}
              </Link>
            </span>
          }
        />
        <p className="text-base text-gray-500">{description}</p>
      </div>
      <div className="mt-5 h-56 w-full overflow-clip rounded-md">
        <MapView lat={location.latitude} long={location.longitude} zoom={17} />
      </div>
      <AddressLink
        className="link mt-1 block text-center text-sm"
        text={location.address}
        searchStr={`${location.business.name}, ${location.address}`}
      />
    </>
  )
}

export default Event
