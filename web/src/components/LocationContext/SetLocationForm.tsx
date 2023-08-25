import { SearchForAreaQuery } from 'types/graphql'

import { Form, useForm } from '@redwoodjs/forms'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { useSearchForAreaQuery } from './useSearchForAreaQuery'

interface IFormSetLocation {
  searchText: string
}

const SetLocationForm = () => {
  const formMethods = useForm<IFormSetLocation>({})

  const onGetSearchForArea = (data: SearchForAreaQuery) => {
    console.log('set location autofill suggestions', data)
  }

  const { getSearchForArea } = useSearchForAreaQuery(onGetSearchForArea)

  return (
    <Form<IFormSetLocation>
      formMethods={formMethods}
      onSubmit={(data) => {
        console.log('onSubmit data', data)
      }}
    >
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="searchText" className="text-right">
          Location
        </Label>
        <Input
          id="searchText"
          placeholder="Seattle, WA"
          className="col-span-3"
          onChange={(e) => {
            getSearchForArea({ variables: { searchText: e.target.value } })
          }}
        />
      </div>
    </Form>
  )
}

export default SetLocationForm
