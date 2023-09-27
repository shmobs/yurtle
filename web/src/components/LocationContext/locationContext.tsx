import { IParsedLocationInfo } from './locationContextUtils'
import { useReverseGeocodeQuery } from './useReverseGeocodeQuery'

export interface ISearchLocationInfo {
  lng: number
  lat: number
  humanReadableName: string
}

interface ISearchLocationContext {
  /**
   * The current searchLocation of the user
   * - `null`: searchLocation has not been set
   * - `undefined`: searchLocation is loading
   */
  searchLocation: ISearchLocationInfo | null | undefined
  setSearchLocation: (searchLocation: ISearchLocationInfo) => void
  searchLocationPopoverOpen: boolean
  setSearchLocationPopoverOpen: (open: boolean) => void
}

const SearchLocationContext = React.createContext<
  ISearchLocationContext | undefined
>(undefined)

function createHumanReadableName(
  neighborhood?: string,
  place?: string,
  region?: string,
  country?: string
): string {
  return [neighborhood, place, region, country]
    .filter((part) => part && part.trim() !== '')
    .join(', ')
}

interface ILocationProviderProps {
  children: React.ReactNode
}

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [searchLocation, setSearchLocationRaw] = React.useState<
    ISearchLocationInfo | null | undefined
  >(null)

  // same as setSearchLocationRaw, but console logs
  const setSearchLocation = (
    searchLocation: ISearchLocationInfo | null | undefined
  ) => {
    console.log('setting search location', searchLocation)
    setSearchLocationRaw(searchLocation)
  }

  const [searchLocationPopoverOpen, setSearchLocationPopoverOpen] =
    React.useState(false)

  const onCompleteGetReverseGeocode = (searchLocInfo: IParsedLocationInfo) => {
    const { lng, lat, neighborhood, place, region, country } = searchLocInfo

    setSearchLocation({
      lng: lng,
      lat: lat,
      humanReadableName: createHumanReadableName(
        neighborhood,
        place,
        region,
        country
      ),
    })
  }

  const { getReverseGeocode } = useReverseGeocodeQuery(
    onCompleteGetReverseGeocode
  )

  const getSearchLocation = React.useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          getReverseGeocode({
            variables: {
              lat: latitude,
              lng: longitude,
            },
          })
        },
        (error) => {
          setSearchLocation(null)
          setSearchLocationPopoverOpen(true) // Open the popover when there's an error
          console.log("error in getSearchLocation's getCurrentPosition", error)
        }
      )
    } else {
      setSearchLocation(null)
      setSearchLocationPopoverOpen(true) // Open the popover when geolocation is not available
    }
  }, [getReverseGeocode])

  React.useEffect(() => {
    if (searchLocation === null && !searchLocationPopoverOpen) {
      setSearchLocation(undefined) // undefined reflects loading
      getSearchLocation()
    }
  }, [getSearchLocation, searchLocation, searchLocationPopoverOpen])

  return (
    <SearchLocationContext.Provider
      value={{
        searchLocation,
        setSearchLocation,
        searchLocationPopoverOpen,
        setSearchLocationPopoverOpen,
      }}
    >
      {children}
    </SearchLocationContext.Provider>
  )
}

export const useSearchLocationContext = (): ISearchLocationContext => {
  const context = React.useContext(SearchLocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
