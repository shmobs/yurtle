import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

interface IEventDateProps {
  dateStr: string
}

const EventDate = ({ dateStr }: IEventDateProps) => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(advancedFormat)

  const date = dayjs(dateStr)
  const formattedDateStr = date
    .tz(dayjs.tz.guess())
    .format('MMMM D, YYYY h:mm A (z)')

  return <div className="text-sm text-gray-500">{formattedDateStr}</div>
}

export default EventDate
