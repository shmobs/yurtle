import { MetaTags } from '@redwoodjs/web'

import { useSearchLocationContext } from 'src/components/LocationContext/locationContext'
import SearchBox from 'src/components/SearchBox/SearchBox'
import TextSeachCell from 'src/components/TextSearchCell'
import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

interface ISearchForVenuePageProps {
  searchQuery?: string
}

const SearchForVenuePage = ({
  searchQuery: searchQueryRaw,
}: ISearchForVenuePageProps) => {
  const { searchLocation } = useSearchLocationContext()

  // the searchQuery comes in HTML encoded, so we need to decode it
  const searchQuery = searchQueryRaw
    ? decodeURIComponent(searchQueryRaw)
    : undefined

  const title = searchQuery
    ? `Search results for '${searchQuery}'`
    : 'Search for Venue'
  return (
    <div className="flex flex-col gap-2">
      <MetaTags title={title} description="Search for venue page" />

      <SimpleHeader title={title} />

      <SearchBox initialValue={searchQuery} />

      {searchQuery && searchLocation && (
        <TextSeachCell
          query={searchQuery}
          location={`${searchLocation.lat},${searchLocation.lng}`}
        />
      )}
    </div>
  )
}

export default SearchForVenuePage
