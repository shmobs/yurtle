import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"

/**
 * This needs to support both what we get back from the Google Places API and what we get back from our own API
 */
export interface ILocationCardProps {
  /** If this is included, it means that we have already created a record for it */
  id?: string
  /** This must be included if `id` is not included. We use it to create the record for it if it doesn't yet exist. */
  gmapsPlaceId?: string
  businessName: string
  address?: string
}

const LocationCard = ({
  id,
  gmapsPlaceId,
  businessName,
  address,
}: ILocationCardProps) => {

  return (
    <li key={id || gmapsPlaceId}>
      <Card className="px-3 py-3 h-28">
        <CardTitle>{businessName}</CardTitle>
        {address && <CardDescription>{address}</CardDescription>}
      </Card>
    </li>
  )
}

export default LocationCard
