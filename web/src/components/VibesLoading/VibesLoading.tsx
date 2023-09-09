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
    <Player
      className="max-w-sm"
      autoplay
      loop
      src="/animations/yurtle-meditating-animation.json"
      style={{
        background: 'transparent',
        marginTop: '-3rem',
        marginBottom: '-3rem',
      }}
    />
  </section>
)

export default VibesLoading
