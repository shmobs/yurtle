import { Form, useForm } from '@redwoodjs/forms'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { ISearchLocationInfo } from './locationContextUtils'
import { useForwardGeocodeQuery } from './useForwardGeocodeQuery'

interface IFormSetLocation {
  searchText: string
}

const SetLocationForm = () => {
  const formMethods = useForm<IFormSetLocation>({})

  const onGetForwardGeocode = (searchLocInfo: ISearchLocationInfo) => {
    console.log('onGetForwardGeocode searchLocInfo', searchLocInfo)
  }

  const { getForwardGeocode } = useForwardGeocodeQuery(onGetForwardGeocode)

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
            getForwardGeocode({ variables: { searchText: e.target.value } })
          }}
        />
      </div>
    </Form>
  )
}

export default SetLocationForm
