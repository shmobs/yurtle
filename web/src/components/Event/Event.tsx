import { ArrowRight } from 'lucide-react'
import { EventQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { SimplePageHeader } from 'src/layouts/SiteLayout'
import { cn } from 'src/lib/utils'

import AddressLink from '../AddressLink'
import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

interface IEventProps {
  event: EventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  const { name, type, description, location } = event

  const LocationBtn = ({ className }: { className?: string }) => (
    <div
      className={cn(
        'mt-4 flex justify-center md:mt-5 md:justify-end',
        className
      )}
    >
      <Button asChild>
        <Link to={routes.location({ id: location.id })}>
          View other events at this venue
        </Link>
      </Button>
    </div>
  )
  return (
    <>
      <SimplePageHeader title={name} subtitle={type} />
      <div className="md:flex md:min-h-full md:gap-5">
        {/* Event info */}
        <div className="md:w-1/2">
          <div className="md:flex md:h-full md:flex-col">
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
            <LocationBtn className="hidden md:flex" />
          </div>
        </div>
        {/* Location info */}
        <div className="md:w-1/2">
          <div className="mt-5 h-56 w-full overflow-clip rounded-md md:mt-0 md:h-96">
            <MapView
              lat={location.latitude}
              long={location.longitude}
              zoom={17}
            />
          </div>
          <AddressLink
            className="link mt-1 block text-center text-sm"
            text={location.address}
            searchStr={`${location.business.name}, ${location.address}`}
          />
          <LocationBtn className="flex md:hidden" />
        </div>
      </div>
    </>
  )
}

export default Event
