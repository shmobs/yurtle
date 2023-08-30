import { GetPlaceVibesQuery } from 'types/graphql'

import HorizontalSnapScroll from '../HorizontalSnapScroll/HorizontalSnapScroll'
import { Card, CardDescription, CardTitle } from '../ui/card'

interface IVibesProps {
  placeVibes: GetPlaceVibesQuery['placeVibes']
}

const Vibes = ({ placeVibes }: IVibesProps) => {
  return (
    <div className="h-full w-full">
      <HorizontalSnapScroll
        items={placeVibes.map((vibe) => {
          return (
            <Card
              key={vibe.eventName}
              className="relative h-full w-full overflow-clip"
            >
              <div className="relative z-10 h-full w-full overflow-y-scroll bg-indigo-900/60 p-5 text-white">
                <CardTitle className="text-base sm:text-xl">
                  {vibe.eventName}
                </CardTitle>
                <CardDescription className="mb-2 italic text-white sm:mb-6">
                  {vibe.eventType}
                </CardDescription>
                <CardDescription className="prose font-light tracking-wide text-white sm:text-base sm:font-normal">
                  {vibe.eventDescription}
                </CardDescription>
              </div>
              <div
                className="absolute left-0 top-0 z-0 h-full w-full blur-sm"
                style={{
                  backgroundImage: `url('https://source.unsplash.com/250x250/?${vibe.eventName}')`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
            </Card>
          )
        })}
      />
    </div>
  )
}

export default Vibes
