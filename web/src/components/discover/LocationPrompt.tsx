export interface ILocationPromptProps {
  onLocation: (location: { latitude: number; longitude: number }) => void
}

const LocationPrompt = ({ onLocation }: ILocationPromptProps) => {
  const [location, setLocation] = React.useState(null)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
          onLocation({ latitude, longitude })
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [onLocation])

  return (
    <div>
      {location && (
        <div>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </div>
      )}
    </div>
  )
}

export default LocationPrompt
