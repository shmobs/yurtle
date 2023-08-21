import { NearbyLocationsQuery } from 'types/graphql'

interface ILocationsProps {
  locations: NearbyLocationsQuery['nearbyLocations']
}

const Locations = ({ locations }: ILocationsProps) => {
  return (
    <ul>
      {locations.results.map((item) => {
        return (
          <li key={item.place_id}>
            <h2>{item.name}</h2>
          </li>
        )
      })}
    </ul>
  )
}

export default Locations
