import { useReverseGeocodeQuery } from './useReverseGeocodeQuery'

export interface ISearchLocationInfo {
  lng: number
  lat: number
  neighborhood: string
  place: string
  region: string
  country: string
}

interface ILocationContext {
  /**
   * The current location of the user
   * - `null`: location has not been set
   * - `undefined`: location is loading
   */
  location: ISearchLocationInfo | null | undefined
  setLocation: (location: ISearchLocationInfo) => void
  locationPopoverOpen: boolean
  setLocationPopoverOpen: (open: boolean) => void
}

const LocationContext = React.createContext<ILocationContext | undefined>(
  undefined
)

interface ILocationProviderProps {
  children: React.ReactNode
}

export const LocationProvider = ({ children }: ILocationProviderProps) => {
  const [location, setLocation] = React.useState<
    ISearchLocationInfo | null | undefined
  >(undefined)

  const [locationPopoverOpen, setLocationPopoverOpen] = React.useState(false)

  const onCompleteGetReverseGeocode = (searchLocInfo: ISearchLocationInfo) => {
    setLocation(searchLocInfo)
  }

  const { getReverseGeocode } = useReverseGeocodeQuery(
    onCompleteGetReverseGeocode
  )

  const setLocationFromNavigator = React.useCallback(() => {
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
          setLocation(null)
          console.log(error)
          // Here you can handle the error case, maybe showing a dialog to the user
        }
      )
    } else {
      setLocation(null)
      // Here you can handle the case where navigator.geolocation is not available
      // You mentioned you want a dialog here, so you can set up a placeholder for that
      console.log('Geolocation is not supported by this browser.')
    }
  }, [getReverseGeocode])

  React.useEffect(() => {
    setLocationFromNavigator()
  }, [setLocationFromNavigator])

  React.useEffect(() => {
    if (location === null) {
      setLocationPopoverOpen(true)
    }
  }, [location])

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        locationPopoverOpen,
        setLocationPopoverOpen,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = (): ILocationContext => {
  const context = React.useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
