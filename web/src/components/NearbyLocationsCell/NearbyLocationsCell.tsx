import React, { useEffect, useRef, useState } from 'react'

import { TabsList } from '@radix-ui/react-tabs'
import SwiperCore from 'swiper'
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from 'swiper/react'
import type { NearbyLocationsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { ILocationCardProps } from 'src/components/LocationCard'
import Locations from 'src/components/Locations'

import { EVENT_SHORT_INFO_FRAGMENT } from '../EventCell/eventFragments'
import { EventsByStatus } from '../EventsByStatus/EventsByStatus'
import { Tabs, TabsTrigger } from '../ui/tabs'

// fragments in redwood are broken, so need to do this or the type generator will fail
export const QUERY = () => gql`
  ${EVENT_SHORT_INFO_FRAGMENT}
  query NearbyLocationsQuery($location: String!, $radius: Int) {
    nearbyLocations: searchNearby(location: $location, radius: $radius) {
      html_attributions
      status
      error_message
      info_messages
      next_page_token
      eventsScheduled {
        ...EventShortInfo
      }
      eventsRequested {
        ...EventShortInfo
      }
      eventsSuggested {
        ...EventShortInfo
      }
      results {
        place_id
        rendyLocationId
        name
        business_status
        mapboxStaticImageUrl
        geometry {
          location {
            lat
            lng
          }
          viewport {
            northeast {
              lat
              lng
            }
            southwest {
              lat
              lng
            }
          }
        }
        icon
        icon_background_color
        icon_mask_base_uri
        photos {
          height
          html_attributions
          photo_reference
          width
        }
        types
      }
    }
  }
`

export const Loading = () => <Locations />

export const Empty = () => <Locations locations={[]} />

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const standardizeLocations = (
  nearbyLocations: NearbyLocationsQuery['nearbyLocations']
): ILocationCardProps[] => {
  if (!nearbyLocations.results) return []
  return nearbyLocations.results.map((location) => {
    return {
      id: location.rendyLocationId || undefined,
      gmapsPlaceId: location.place_id,
      businessName: location.name,
      backgroundImageUrl: location.mapboxStaticImageUrl,
    }
  })
}

export const Success = ({
  nearbyLocations,
}: CellSuccessProps<NearbyLocationsQuery>) => {
  const [currTab, setCurrTab] = useState(0)
  const swiperRef = useRef<any>(null)

  const handleSwiper = (swiper: SwiperCore) => {
    swiperRef.current = swiper
    swiper.on('slideChange', () => setCurrTab(swiper.activeIndex))
  }

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currTab)
    }
  }, [currTab])

  return (
    <div>
      <Tabs
        className="bg-gray-200 p-3"
        value={currTab.toString()}
        onValueChange={(value) => setCurrTab(Number(value))}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="0">Locations</TabsTrigger>
          <TabsTrigger value="1">Events</TabsTrigger>
        </TabsList>
      </Tabs>
      <Swiper
        ref={swiperRef}
        onSwiper={handleSwiper}
        autoHeight
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide virtualIndex={0}>
          <Locations locations={standardizeLocations(nearbyLocations)} />
        </SwiperSlide>
        <SwiperSlide virtualIndex={1}>
          <EventsByStatus
            eventsByStatus={{
              REQUESTED: nearbyLocations.eventsRequested ?? [],
              SCHEDULED: nearbyLocations.eventsScheduled ?? [],
              SUGGESTED: nearbyLocations.eventsSuggested ?? [],
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
