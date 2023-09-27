import SearchNearby from 'src/components/discover/SearchNearby'
import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

const SearchNearbyPage = () => {
  return (
    <>
      <SimplePageHeader
        title="Nearby Venues & Events"
        subtitle="Welcome to your gateway to local exploration. Dive into our separate tabs to discover amazing venues and exciting events in your area."
      />
      <SearchNearby />
    </>
  )
}

export default SearchNearbyPage
