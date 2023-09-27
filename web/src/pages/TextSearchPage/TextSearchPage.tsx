import { useSearchLocationContext } from 'src/components/LocationContext/locationContext'
import SearchBox from 'src/components/SearchBox/SearchBox'
import TextSeachCell from 'src/components/TextSearchCell'
import { SimplePageHeader } from 'src/layouts/SiteLayout/SiteLayout'

interface ITextSearchPageProps {
  searchQuery?: string
}

const TextSearchPage = ({
  searchQuery: searchQueryRaw,
}: ITextSearchPageProps) => {
  const { searchLocation } = useSearchLocationContext()

  // the searchQuery comes in HTML encoded, so we need to decode it
  const searchQuery = searchQueryRaw
    ? decodeURIComponent(searchQueryRaw)
    : undefined

  const title = searchQuery
    ? `Search results for '${searchQuery}'`
    : 'Search for Venues and Events'
  return (
    <div className="flex flex-col gap-2">
      <SimplePageHeader
        title={title}
        subtitle={
          !searchQuery &&
          'Your local adventure starts here. Use our search tool to find the best venues and events near you.'
        }
      />

      <SearchBox initialValue={searchQuery} />

      {searchQuery && searchLocation ? (
        <TextSeachCell
          query={searchQuery}
          location={`${searchLocation.lat},${searchLocation.lng}`}
        />
      ) : (
        <div className="mt-28 text-center text-lg text-gray-500 sm:mt-8">
          What are you looking for?
          <br />
          Enter a term into the search box
          <br />
          and press Search!
        </div>
      )}
    </div>
  )
}

export default TextSearchPage
