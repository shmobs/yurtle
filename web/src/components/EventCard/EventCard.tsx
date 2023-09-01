import { Card, CardDescription, CardTitle } from '../ui/card'

interface IEventCardProps {
  name: string
  type: string
  description: string
}

const EventCard = ({ name, type, description }: IEventCardProps) => {
  return (
    <Card key={name} className="relative h-full w-full overflow-clip">
      <div className="relative z-10 h-full w-full overflow-y-scroll bg-indigo-900/60 p-5 text-white">
        <CardTitle className="text-base sm:text-xl">{name}</CardTitle>
        <CardDescription className="mb-2 italic text-white sm:mb-3">
          {type}
        </CardDescription>
        <CardDescription className="prose font-light tracking-wide text-white">
          {description}
        </CardDescription>
      </div>
      <div
        className="absolute left-0 top-0 z-0 h-full w-full blur-[2px]"
        style={{
          backgroundImage: `url('https://source.unsplash.com/250x250/?${name}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </Card>
  )
}

export default EventCard
