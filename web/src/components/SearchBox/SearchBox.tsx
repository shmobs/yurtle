import { Form, useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'

import { TextField } from 'src/components/ui/input'

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
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={onSubmit}
      formMethods={formMethods}
    >
      {/* <Input
        name="searchQuery"
        ref={fieldRef}
        placeholder="Search for a venue"
        disabled={!searchLocation}
      /> */}
      <TextField
        name="searchQuery"
        ref={fieldRef}
        placeholder="Search for a venue"
        disabled={!searchLocation}
        defaultValue={initialValue}
      />
      <Button type="submit">Search</Button>
    </Form>
  )
}

export default SearchBox
