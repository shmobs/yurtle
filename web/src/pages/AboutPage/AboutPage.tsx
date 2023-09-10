import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { HeaderSlot } from 'src/layouts/SiteLayout'
import YurtleLogoOutline from 'src/layouts/SiteLayout/logos/YurtleLogoOutline'
import YurtleWordmark from 'src/layouts/SiteLayout/logos/YurtleWordmark'

const AboutPage = () => {
  return (
    <>
      <MetaTags
        title="About Us"
        description="'Yurtle,' inspired by the enduring spirit of turtles and the community-centric ethosof Dr. Seuss's 'Yertle the Turtle,' champions the power of local engagement, inclusivity, and community. Our turtle logo, a testament to the values of deliberate exploration and sustainability, mirrors our platform's commitment to responsible community involvement. Just as every turtle mattered in Yertle's stack, every user, event, and small business holds significance on our platform. Yurtle not only connects users with nearby small businesses and events, but also generates creative event ideas, fostering a vibrant ecosystem of event creation and participation. This homage to both the natural world and a beloved literary classic encapsulates our mission: to make every event a meaningful journey, and every participant, a crucial part of the community."
      />
      <HeaderSlot.Plug id="about">
        <div className="flex justify-center gap-4 align-middle sm:gap-20 md:py-10">
          <YurtleLogoOutline className="h-12 w-auto sm:h-20" />
          <YurtleWordmark className="my-auto h-5 w-auto sm:h-10" />
        </div>
      </HeaderSlot.Plug>
      <div className="relative isolate overflow-clip">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#8646E6] to-[#5046E6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-5 pb-32 pt-10 sm:pb-20 md:pt-20">
          <p className="prose mx-auto mb-14 text-justify">
            <span className="text-2xl">Yurtle,</span> inspired by the enduring
            spirit of turtles and the community-centric ethos of Dr. Seuss's
            "Yertle the Turtle," champions the power of{' '}
            <span className="italic">
              local engagement, inclusivity, and community.
            </span>{' '}
            Our turtle logo, a testament to the values of deliberate exploration
            and sustainability, mirrors our platform's commitment to responsible
            community involvement.
            <br />
            <br />
            Just as every turtle mattered in Yertle's stack, every user, event,
            and small business holds significance on our platform. Yurtle not
            only connects users with nearby small businesses and events, but
            also generates creative event ideas, fostering a vibrant ecosystem
            of event creation and participation. This homage to both the natural
            world and a beloved literary classic encapsulates our mission:{' '}
            <strong className="text-lg">
              to make every event a meaningful journey, and every participant a
              crucial part of the community.
            </strong>
          </p>
          <YurtleLogoOutline colored className="m-auto h-16 w-auto" />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#8646E6] to-[#5046E6] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </>
  )
}

export default AboutPage
