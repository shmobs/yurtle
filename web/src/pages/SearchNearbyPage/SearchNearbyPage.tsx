import SearchNearby from 'src/components/discover/SearchNearby'
import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

const SearchNearbyPage = () => {
  return (
    <>
      <SimplePageHeader title="Nearby Venues and Events" />
      <SearchNearby />
    </>
  )
}

export default SearchNearbyPage
