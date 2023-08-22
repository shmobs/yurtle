import { MetaTags } from '@redwoodjs/web'

import SearchNearby from 'src/components/discover/SearchNearby'

const SearchNearbyPage = () => {
  return (
    <>
      <MetaTags title="SearchNearby" description="SearchNearby page" />

      <SearchNearby />
    </>
  )
}

export default SearchNearbyPage
