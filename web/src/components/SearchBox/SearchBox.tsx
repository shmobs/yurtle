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
      navigate(routes.searchForVenueWithQuery({ searchQuery }))
    }
  }

  return (
    <Form<IFormSearch>
      className="mx-auto flex w-11/12 items-center justify-center space-x-2 pt-5 sm:w-96 md:pt-10"
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
      <Button className="mb-3" type="submit" disabled={!searchLocation}>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
