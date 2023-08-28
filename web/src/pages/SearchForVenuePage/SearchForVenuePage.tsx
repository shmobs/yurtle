import { MetaTags } from '@redwoodjs/web'

import { useSearchLocationContext } from 'src/components/LocationContext/locationContext'
import SearchBox from 'src/components/SearchBox/SearchBox'
import TextSeachCell from 'src/components/TextSearchCell'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

interface ISearchForVenuePageProps {
  searchQuery?: string
}

const SearchForVenuePage = ({ searchQuery }: ISearchForVenuePageProps) => {
  const { searchLocation } = useSearchLocationContext()

  // the searchQuery comes in HTML encoded, so we need to decode it
  searchQuery = searchQuery ? decodeURIComponent(searchQuery) : undefined

  const title = searchQuery
    ? `Search results for '${searchQuery}'`
    : 'Search for Venue'
  return (
    <>
      <MetaTags title={title} description="Search for venue page" />

      <SimpleHeader title={title} />

      <SearchBox />

      {searchQuery && searchLocation && (
        <TextSeachCell
          query={searchQuery}
          location={`${searchLocation.lat},${searchLocation.lng}`}
        />
      )}
    </>
  )
}

export default SearchForVenuePage
