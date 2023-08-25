import { Check, ChevronsUpDown } from 'lucide-react'
import { SearchForAreaQuery } from 'types/graphql'

import { Button } from 'src/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from 'src/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover'
import { cn } from 'src/lib/utils'

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
  const [value, setValue] = React.useState('')

  const onGetSearchForArea = (data: SearchForAreaQuery) => {
    setLocationSuggestions(
      data.searchForArea?.suggestions.map((suggestion) => ({
        value: suggestion.mapbox_id,
        label: `${suggestion.name}, ${suggestion.place_formatted}`,
      }))
    )
  }

  const { getSearchForArea } = useSearchForAreaQuery(onGetSearchForArea)

  return (
    <>
      <div className="relative z-50">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? locationSuggestions.find(
                    (framework) => framework.value === value
                  )?.label
                : 'Set location...'}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command className="z-50">
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
              <CommandEmpty>No locations found.</CommandEmpty>
              <CommandGroup>
                {locationSuggestions.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === framework.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
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
