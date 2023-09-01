import SearchNearby from 'src/components/discover/SearchNearby'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

const SearchNearbyPage = () => {
  return (
    <>
      <SimpleHeader title="Nearby Venues" />
      <SearchNearby />
    </>
  )
}

export default SearchNearbyPage
