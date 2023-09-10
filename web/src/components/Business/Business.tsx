import { BusinessQuery } from 'types/graphql'

import { SimplePageHeader } from 'src/layouts/SiteLayout'
import { cn } from 'src/lib/utils'

import Locations from '../Locations/Locations'
import SectionHeader from '../SectionHeader/SectionHeader'
import { Skeleton } from '../ui/skeleton'

interface IBusinessProps {
  business?: BusinessQuery['business']
}
const Business = ({ business }: IBusinessProps) => {
  const { name, locations, description } = business || {}
  return (
    <>
      {name && <SimplePageHeader title={name} />}
      <div>
        <p>
          {description || (
            <>
              <Skeleton className="mb-2 h-5" />
              <Skeleton className="h-5" />
            </>
          )}
        </p>
        {name ? (
          <SectionHeader
            title="Venues"
            subtitle={`${name}'s venues with events on Yurtle`}
          />
        ) : (
          <SectionHeader className="mb-5" />
        )}
        <Locations
          locations={locations?.map((loc) => ({
            id: loc.id,
            businessName: loc.address,

            backgroundImageUrl: loc.mapboxStaticImageUrl,
          }))}
        />
      </div>
    </>
  )
}

export default Business
