import { FindEventQuery } from 'types/graphql'

import { SimpleHeader } from 'src/layouts/SiteLayout/SiteLayout'

interface IEventProps {
  event: FindEventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  return (
    <>
      <SimpleHeader title={event.name} />
    </>
  )
}

export default Event
