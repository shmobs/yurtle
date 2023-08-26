import { Check, Navigation } from 'lucide-react'
import { SearchForAreaQuery } from 'types/graphql'

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

import { useSearchForAreaQuery } from './useSearchForAreaQuery'

interface ILocationSuggestion {
  value: string
  label: string
}

interface ISetLocationPopoverProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const SetLocationPopover = ({ open, setOpen }: ISetLocationPopoverProps) => {
  const [locationSuggestions, setLocationSuggestions] = React.useState<
    ILocationSuggestion[]
  >([])
  const [value, setValue] = React.useState<ILocationSuggestion | undefined>(
    undefined
  )

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
    if (value) {
      setOpen(open)
    } else {
      if (open) {
        setOpen(open)
      }
    }
  }

  return (
    <>
      <div className="relative z-50">
        <Popover open={open} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[325px] justify-between"
            >
              <Navigation className="mr-4 h-4 w-4 shrink-0 opacity-50" />
              <span className="w-[300px] truncate text-start">
                {value ? value.label : 'Set location...'}
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
                {!searchLoading && (
                  <CommandEmpty>No locations found.</CommandEmpty>
                )}
                {locationSuggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.value}
                    onSelect={(_currentValue) => {
                      // for some reason, currentValue is the label and not the value
                      setValue(suggestion)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value?.value === suggestion.value
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
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
