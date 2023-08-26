import { MapboxGeocodeResponseType, QueryResolvers } from 'types/graphql'

export const mapboxRetrieveSuggestion: QueryResolvers['mapboxRetrieveSuggestion'] =
  async ({ mapboxId }) => {
    const rootUrl = 'https://api.mapbox.com/search/searchbox/v1/retrieve/'

    const retrieveUrl = `${rootUrl}${mapboxId}?access_token=${
      process.env.MAPBOX_API_KEY
    }&session_token=${'9aRLTNekCeum7nbt2b6hvNYuNqCqwbWtoURveQTKRfX7ENCgS3ne3B33sJpzmUP8'}`

    const res = await fetch(retrieveUrl)

    const resContent = (await res.json()) as MapboxGeocodeResponseType

    return resContent
  }
