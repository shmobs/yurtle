import LocationPrompt from '../LocationPrompt'

interface ISearchNearbyProps {
  onLocation: (location: { latitude: number; longitude: number }) => void
}

const SearchNearby = ({ onLocation }: ISearchNearbyProps) => {
  const [location, setLocation] = React.useState(null)

  const handleLocation = (loc: { latitude: number; longitude: number }) => {
    setLocation(loc)
    onLocation(loc)
  }
  // get user's current location as lat/long
  return <LocationPrompt onLocation={handleLocation} />
}

export default SearchNearby
