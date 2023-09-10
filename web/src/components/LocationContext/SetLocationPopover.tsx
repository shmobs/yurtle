import { Navigation } from 'lucide-react'
import {
  MapboxRetrieveSuggestionQuery,
  SearchForAreaQuery,
} from 'types/graphql'

import { Button } from 'src/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from 'src/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover'
import { cn } from 'src/lib/utils'

import { Skeleton } from '../ui/skeleton'

import { useSearchLocationContext } from './locationContext'
import { useMapboxRetrieveSuggestionQuery } from './useMapboxRetrieveSuggestionQuery'
import { useSearchForAreaQuery } from './useSearchForAreaQuery'

interface ILocationSuggestion {
  value: string
  label: string
}

const SetLocationPopover = () => {
  const [locationSuggestions, setLocationSuggestions] = React.useState<
    ILocationSuggestion[]
  >([])
  const {
    searchLocationPopoverOpen: open,
    setSearchLocationPopoverOpen: setOpen,
    setSearchLocation,
    searchLocation,
  } = useSearchLocationContext()

  const onGetMapboxRetrieveSuggestion = (
    data: MapboxRetrieveSuggestionQuery
  ) => {
    const location = data.mapboxRetrieveSuggestion?.features[0]
    if (location) {
      setSearchLocation({
        lat: location.geometry.coordinates[1],
        lng: location.geometry.coordinates[0],
        humanReadableName: `${location.properties.name}, ${location.properties.place_formatted}`,
      })
      setOpen(false)
    }
  }

  const { getMapboxRetrieveSuggestion } = useMapboxRetrieveSuggestionQuery(
    onGetMapboxRetrieveSuggestion
  )

  // whenever the value is set, we want to get the corresponding geometric information and set it in the context
  const setValueAndUpdateSearchLocation = (value: ILocationSuggestion) => {
    getMapboxRetrieveSuggestion({
      variables: {
        mapboxId: value.value,
      },
    })
  }

  const onGetSearchForArea = (data: SearchForAreaQuery) => {
    setLocationSuggestions(
      data.searchForArea?.suggestions.map((suggestion) => ({
        value: suggestion.mapbox_id,
        label: `${suggestion.name}, ${suggestion.place_formatted}`,
      }))
    )
  }

  const { getSearchForArea, loading: searchLoading } =
    useSearchForAreaQuery(onGetSearchForArea)

  // only allow for closing the popover once a location has been selected
  const onOpenChange = (open: boolean) => {
    if (searchLocation) {
      setOpen(open)
    } else {
      if (open) {
        setOpen(open)
      }
    }
  }

  const isPopoverButtonDisabled =
    searchLocation === undefined || // it's loading
    searchLocation === null // it hasn't been set

  return (
    <>
      <div className="relative z-50">
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                'w-[225px] justify-between sm:w-[325px]',
                !open
                  ? 'border-indigo-900 bg-indigo-800 text-indigo-300'
                  : 'text-gray-900'
              )}
              disabled={isPopoverButtonDisabled}
            >
              <Navigation className="mr-4 h-4 w-4 shrink-0 opacity-50" />
              <span className="w-[300px] truncate text-start">
                {searchLocation === null
                  ? 'Set location to continue'
                  : searchLocation === undefined
                  ? 'Loading...'
                  : searchLocation.humanReadableName}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[325px] p-0">
            <Command className="z-50" shouldFilter={false}>
              <CommandInput
                placeholder="Seattle, WA"
                onValueChange={(value) => {
                  getSearchForArea({
                    variables: {
                      searchText: value,
                    },
                  })
                }}
              />
              <CommandList>
                {searchLoading && (
                  <CommandLoading>
                    <CommandItem>
                      <Skeleton className="h-4 w-full" />
                    </CommandItem>
                  </CommandLoading>
                )}
                {!searchLoading && open && (
                  <CommandEmpty>No locations found.</CommandEmpty>
                )}
                {locationSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.value}
                    onSelect={(_currentValue) => {
                      // for some reason, currentValue is the label and not the value
                      setValueAndUpdateSearchLocation(suggestion)
                    }}
                  >
                    {/* <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value?.value === suggestion.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    /> */}
                    <span className="w-[300px] truncate">
                      {suggestion.label}
                    </span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div
        className={cn(
          open
            ? 'visible bg-background/80 backdrop-blur-sm'
            : 'invisible bg-background/0 backdrop-blur-none',
          'absolute bottom-0 left-0 right-0 top-0 z-10 transition-all'
        )}
      />
    </>
  )
}

export default SetLocationPopover
