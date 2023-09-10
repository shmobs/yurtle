import { LocationQuery } from 'types/graphql'

import PlaceVibesCell from 'src/components/PlaceVibesCell'
import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

import AuthRequiredDialog from '../AuthRequiredDialog/AuthRequiredDialog'
import ClaimLocationDialog from '../ClaimLocationDialog/ClaimLocationDialog'
import { EventsByStatus } from '../EventsByStatus/EventsByStatus'
import ManagerBadge from '../ManagerBadge/ManagerBadge'
import MapView from '../Mapbox/Map'
import SectionHeader from '../SectionHeader'
import { Button } from '../ui/button'

interface ILocationProps {
  location: LocationQuery['location']
}

const Location = ({ location }: ILocationProps) => {
  const [isClaimed, setIsClaimed] = React.useState(!!location.managedBy.length)
  const [isClaimDialogOpen, setIsClaimDialogOpen] = React.useState(false)
  const [isClaimedByCurrentUser, setIsClaimedByCurrentUser] = React.useState(
    location.isManagedByCurrentUser
  )

  return (
    <>
      <SimplePageHeader
        title={location.business.name}
        subtitle={location.address}
        subtitleIsAddress
      />

      <ClaimLocationDialog
        locationId={location.id}
        setIsClaimed={(_state) => {
          setIsClaimed(true)
          setIsClaimedByCurrentUser(true)
        }}
        isOpen={isClaimDialogOpen}
        setIsOpen={setIsClaimDialogOpen}
      />

      <main className="relative z-0 flex-1 overflow-y-auto rounded bg-white focus:outline-none sm:pb-10">
        <div
          id="map"
          className="relative h-36 w-full overflow-clip border-t-2 border-white shadow sm:h-56 sm:rounded-t-md sm:border-l-2 sm:border-r-2"
        >
          <MapView
            lat={location.latitude}
            long={location.longitude}
            zoom={16}
          />
          {!isClaimed ? (
            <AuthRequiredDialog
              title="Log in or sign up to claim this venue"
              description="Claiming this venue will allow you to schedule events here."
              buttonWhenAuthenticated={
                <Button
                  variant="secondary"
                  className="absolute bottom-2 left-7 right-7 z-50 m-auto h-7 lg:bottom-4 lg:left-auto lg:right-4 lg:h-9"
                  onClick={() => setIsClaimDialogOpen(true)}
                >
                  To start hosting events, claim this venue
                </Button>
              }
              openDialogButton={
                <Button
                  variant="secondary"
                  className="absolute bottom-2 left-7 right-7 z-50 m-auto h-7 lg:bottom-4 lg:left-auto lg:right-4 lg:h-9"
                >
                  To start hosting events, claim this venue
                </Button>
              }
              onAuthenticated={() => setIsClaimDialogOpen(true)}
            />
          ) : null}
        </div>

        {isClaimedByCurrentUser && <ManagerBadge location="location" />}

        <SectionHeader
          withPadding
          title="Venue Description"
          subtitle={location.business.description}
        />

        <EventsByStatus
          withPadding
          usageLocation="location"
          eventsByStatus={{
            REQUESTED: location.eventsRequested,
            SCHEDULED: location.eventsScheduled,
            SUGGESTED: (
              <PlaceVibesCell
                withPadding
                locationId={location.id}
                locationName={location.business.name}
              />
            ),
          }}
        />
      </main>
    </>
  )
}

export default Location
