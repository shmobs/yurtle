import { Form, useForm } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'

import { TextField } from 'src/components/ui/input'

import { useSearchLocationContext } from '../LocationContext/locationContext'
import { Button } from '../ui/button'

interface IFormSearch {
  searchQuery: string
}

const SearchBox = () => {
  const formMethods = useForm<IFormSearch>()
  const { searchLocation } = useSearchLocationContext()

  // select field automatically
  const fieldRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    fieldRef.current?.focus()
  }, [fieldRef])

  const onSubmit = (data: IFormSearch) => {
    console.log('onSubmit data', data)
    navigate(
      routes.searchForVenueWithQuery({ searchQuery: data.searchQuery || '' })
    )
  }

  return (
    <Form<IFormSearch> onSubmit={onSubmit} formMethods={formMethods}>
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
      />
      <Button type="submit">Search</Button>
    </Form>
  )
}

export default SearchBox
