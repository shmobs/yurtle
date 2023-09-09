import { BusinessQuery } from 'types/graphql'

import { SimplePageHeader } from 'src/layouts/SiteLayout'
import { cn } from 'src/lib/utils'

import Locations from '../Locations/Locations'
import SectionHeader from '../SectionHeader/SectionHeader'

interface IBusinessProps {
  business: BusinessQuery['business']
}
const Business = ({ business }: IBusinessProps) => {
  const { name, locations, description } = business
  return (
    <>
      <SimplePageHeader title={name} />
      <div>
        <p>{description}</p>
        <SectionHeader
          title="Venues"
          subtitle={`${name}'s venues with events on Yurtle`}
        />
        <Locations
          locations={locations.map((loc) => ({
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
