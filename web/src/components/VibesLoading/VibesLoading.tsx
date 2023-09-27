import { Player } from '@lottiefiles/react-lottie-player'

import SectionHeader from '../SectionHeader/SectionHeader'

interface IVibesLoadingProps {
  locationName: string
  withPadding?: boolean
}
const VibesLoading = ({ locationName, withPadding }: IVibesLoadingProps) => (
  <section>
    <SectionHeader
      withPadding={withPadding}
      title="Curated event suggestions"
      subtitle={`We're curating suggestions for ${locationName}, this will only take a moment...`}
    />
    <div className="-mt-2 mb-2 text-center text-xl font-bold text-indigo-700 sm:mb-0">
      Thinking up some suggestions...
    </div>
    <Player
      className="max-w-sm"
      autoplay
      loop
      src="/animations/yurtle-meditating-animation.json"
      style={{
        background: 'transparent',
        marginTop: '-4rem',
        marginBottom: '-3rem',
      }}
    />
  </section>
)

export default VibesLoading
