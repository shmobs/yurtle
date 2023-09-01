import EventCell from 'src/components/EventCell'

const EventPage = ({ id }: { id: string }) => {
  return (
    <>
      <EventCell id={id} />
    </>
  )
}

export default EventPage
