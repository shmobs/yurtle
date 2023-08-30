import { GetPlaceVibesQuery } from 'types/graphql'

import HorizontalSnapScroll from '../HorizontalSnapScroll/HorizontalSnapScroll'
import { Card, CardDescription, CardTitle } from '../ui/card'

interface IVibesProps {
  placeVibes: GetPlaceVibesQuery['placeVibes']
}

const Vibes = ({ placeVibes }: IVibesProps) => {
  return (
    <div>
      <HorizontalSnapScroll
        items={placeVibes.map((vibe) => {
          return (
            <Card
              key={vibe.eventName}
              className="relative h-60 w-64 overflow-y-scroll"
            >
              <div className="relative z-10 h-full w-full bg-indigo-900/40 p-5 text-white">
                <CardTitle className="text-base">{vibe.eventName}</CardTitle>
                <CardDescription className="mb-2 italic text-white">
                  {vibe.eventType}
                </CardDescription>
                <CardDescription className="prose font-light tracking-wide text-white">
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
