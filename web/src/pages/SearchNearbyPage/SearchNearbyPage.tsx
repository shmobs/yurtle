import { MetaTags } from '@redwoodjs/web'

import SearchNearby from 'src/components/discover/SearchNearby'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

const SearchNearbyPage = () => {
  return (
    <>
      <MetaTags
        title="Nearby Businesses"
        description="Nearby Businesses page"
      />
      <SimpleHeader title="Nearby Businesses" />
      <SearchNearby />
    </>
  )
}

export default SearchNearbyPage
