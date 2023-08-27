import { MetaTags } from '@redwoodjs/web'

import SearchNearby from 'src/components/discover/SearchNearby'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

const SearchNearbyPage = () => {
  return (
    <>
      <MetaTags title="Nearby Venues" description="Nearby Venues page" />
      <SimpleHeader title="Nearby Venues" />
      <SearchNearby />
    </>
  )
}

export default SearchNearbyPage
