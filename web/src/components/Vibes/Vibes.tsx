import { GetPlaceVibesQuery } from 'types/graphql'

import HorizontalSnapScroll from '../HorizontalSnapScroll/HorizontalSnapScroll'
import { Card, CardDescription, CardTitle } from '../ui/card'

interface IVibesProps {
  placeVibes: GetPlaceVibesQuery['placeVibes']
}

const Vibes = ({ placeVibes }: IVibesProps) => {
  const placeVibeCards = placeVibes.map((vibe) => {
    return (
      <Card key={vibe.name} className="relative h-full w-full overflow-clip">
        <div className="relative z-10 h-full w-full overflow-y-scroll bg-indigo-900/60 p-5 text-white">
          <CardTitle className="text-base sm:text-xl">{vibe.name}</CardTitle>
          <CardDescription className="mb-2 italic text-white sm:mb-3">
            {vibe.type}
          </CardDescription>
          <CardDescription className="prose font-light tracking-wide text-white">
            {vibe.description}
          </CardDescription>
        </div>
        <div
          className="absolute left-0 top-0 z-0 h-full w-full blur-sm"
          style={{
            backgroundImage: `url('https://source.unsplash.com/250x250/?${vibe.name}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      </Card>
    )
  })
  return (
    <div className="h-full w-full">
      <HorizontalSnapScroll items={[...placeVibeCards]} />
    </div>
  )
}

export default Vibes
