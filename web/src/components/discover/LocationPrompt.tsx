const LocationPrompt = () => {
  const [location, setLocation] = React.useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
        },
        (error) => {
          console.log(error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }

  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
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
