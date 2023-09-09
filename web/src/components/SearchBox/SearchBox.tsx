import { Form, useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'

import TextField from 'src/components/ui/form/TextField'

import { useSearchLocationContext } from '../LocationContext/locationContext'
import { Button } from '../ui/button'

interface IFormSearch {
  searchQuery: string
}

interface ISearchBoxProps {
  initialValue?: string
}

const SearchBox = ({ initialValue }: ISearchBoxProps) => {
  const formMethods = useForm<IFormSearch>()
  const { searchLocation } = useSearchLocationContext()

  // select field automatically
  const fieldRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    fieldRef.current?.focus()
  }, [fieldRef])

  const onSubmit = ({ searchQuery }: IFormSearch) => {
    if (searchQuery) {
      navigate(routes.textSearchWithQuery({ searchQuery }))
    }
  }

  return (
    <Form<IFormSearch>
      className="flex w-full flex-col items-center justify-center px-4 pt-5 sm:mx-auto sm:w-[500px] sm:space-x-2 md:flex-row md:pt-10"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      <TextField
        grow
        name="searchQuery"
        ref={fieldRef}
        placeholder={
          searchLocation ? 'Search for venues and events' : 'Loading...'
        }
        disabled={!searchLocation}
        defaultValue={initialValue}
      />
      <Button
        className="h-14 w-full text-lg sm:mb-3 sm:h-10 md:w-auto md:text-base"
        type="submit"
        disabled={!searchLocation}
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
