// Assuming React is globally accessible

import { cn } from 'src/lib/utils'

import SetLocationDialog from './SetLocationDialog'
import SetLocationPopover from './SetLocationPopover'
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
  openLocationPrompt: () => void
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

  const [locationDialogOpen, setLocationDialogOpen] = React.useState(false)

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

  const openLocationPrompt = () => {
    console.log('openLocationPrompt')
  }

  React.useEffect(() => {
    setLocationFromNavigator()
  }, [setLocationFromNavigator])

  React.useEffect(() => {
    if (location === null) {
      setLocationDialogOpen(true)
    }
  }, [location])

  return (
    <LocationContext.Provider
      value={{ location, setLocation, openLocationPrompt }}
    >
      <div className="relative z-50">
        <SetLocationPopover
          open={locationDialogOpen}
          setOpen={setLocationDialogOpen}
        />
      </div>
      <div
        className={cn(
          locationDialogOpen
            ? 'visible bg-background/80 backdrop-blur-sm'
            : 'invisible bg-background/0 backdrop-blur-none',
          'absolute bottom-0 left-0 right-0 top-0 z-10 transition-all'
        )}
      />
      {/* <SetLocationDialog
        open={locationDialogOpen}
        onOpenChange={setLocationDialogOpen}
      /> */}
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = (): ILocationContext => {
  const context = React.useContext(LocationContext)
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider')
  }
  return context
}
