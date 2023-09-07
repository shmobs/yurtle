import { TabsList } from '@radix-ui/react-tabs'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { EventData } from 'src/components/EventsByStatus'
import { ILocationCardProps } from 'src/components/LocationCard'

import { EventsByStatus } from '../EventsByStatus/EventsByStatus'
import Locations from '../Locations'
import { Tabs, TabsTrigger } from '../ui/tabs'

interface ILocationsAndEventsProps {
  locations: ILocationCardProps[]
  eventsByStatus: Partial<EventData>
}

const LocationsAndEvents = ({
  locations,
  eventsByStatus,
}: ILocationsAndEventsProps) => {
  const [currTab, setCurrTab] = React.useState(0)
  const swiperRef = React.useRef<any>(null)

  const handleSwiper = (swiper: SwiperCore) => {
    swiperRef.current = swiper
    swiper.on('slideChange', () => setCurrTab(swiper.activeIndex))
  }

  React.useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currTab)
    }
  }, [currTab])
  return (
    <div id="locations-and-events" className="pb-6 pt-3">
      <Tabs
        className="mx-3 mb-3 rounded-md bg-gray-200 p-2 md:mx-auto md:mb-5 md:max-w-md"
        value={currTab.toString()}
        onValueChange={(value) => setCurrTab(Number(value))}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="md:text-lg" value="0">
            Locations
          </TabsTrigger>
          <TabsTrigger className="md:text-lg" value="1">
            Events
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Swiper
        ref={swiperRef}
        onSwiper={handleSwiper}
        autoHeight
        slidesPerView={1}
      >
        <SwiperSlide>
          <Locations withPadding locations={locations} />
        </SwiperSlide>
        <SwiperSlide>
          <EventsByStatus withPadding eventsByStatus={eventsByStatus} />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default LocationsAndEvents
