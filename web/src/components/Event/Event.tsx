import { FindEventQuery } from 'types/graphql'

interface IEventProps {
  event: FindEventQuery['event']
}

const Event = ({ event }: IEventProps) => {
  return (
    <div>
      <h2>{'Event'}</h2>
      <p>{'Find me in ./web/src/components/Event/Event.tsx'}</p>
    </div>
  )
}

export default Event
