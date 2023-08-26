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

interface ILocationProviderProps {
  children: React.ReactNode
}

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [searchLocation, setSearchLocation] = React.useState<
    ISearchLocationInfo | null | undefined
  >(undefined)

  const [searchLocationPopoverOpen, setSearchLocationPopoverOpen] =
    React.useState(false)

  const onCompleteGetReverseGeocode = (searchLocInfo: IParsedLocationInfo) => {
    const { lng, lat, neighborhood, place, region, country } = searchLocInfo

    setSearchLocation({
      lng: lng,
      lat: lat,
      humanReadableName: `${neighborhood}, ${place}, ${region}, ${country}`,
    })
  }

  const { getReverseGeocode } = useReverseGeocodeQuery(
    onCompleteGetReverseGeocode
  )

  const setSearchLocationFromNavigator = React.useCallback(() => {
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
          console.log(error)
        }
      )
    }

    if (searchLocation === null) {
      setSearchLocationPopoverOpen(true)
    }
  }, [getReverseGeocode, searchLocation])

  React.useEffect(() => {
    setSearchLocationFromNavigator()
  }, [setSearchLocationFromNavigator])

  React.useEffect(() => {
    if (searchLocation === null) {
      setSearchLocationPopoverOpen(true)
    }
  }, [searchLocation])

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
