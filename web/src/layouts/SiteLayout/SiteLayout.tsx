import { Fragment } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { createSlot } from 'react-view-slot'

import { routes, useMatch, Link, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import AddressLink from 'src/components/AddressLink/AddressLink'
import SetLocationPopover from 'src/components/LocationContext/SetLocationPopover'
import { cn } from 'src/lib/utils'

import UserProfileImg from './UserProfileImg'
import YurtleLogo from './YurtleLogo'

export const HeaderSlot = createSlot('header')

type SiteLayoutProps = {
  children?: React.ReactNode
  withoutPadding?: boolean
}

const SiteLayout = ({ children, withoutPadding = false }: SiteLayoutProps) => {
  const { logOut, currentUser: user } = useAuth()

  const navigation = [
    {
      name: 'Nearby',
      href: routes.home(),
      current: useMatch(routes.home()).match,
    },
    {
      name: 'Search',
      href: routes.searchForVenue(),
      current: useMatch(routes.searchForVenue()).match,
    },
  ]

  const navSignedIn = [
    {
      name: 'My Events',
      href: routes.myEvents(),
      current: useMatch(routes.myEvents()).match,
    },
  ]

  const userNavigationLoggedIn = [
    {
      name: 'Sign out',
      onClick: () => {
        logOut()
          .then(() => {
            navigate(routes.home())
            toast.success('You have been signed out')
          })
          .catch(() => {
            toast.error('There was a problem with signing you out')
          })
      },
    },
  ]

  const userNavigationSignedOut = [
    {
      name: 'Sign In or Sign Up',
      onClick: () => {
        navigate(routes.auth())
      },
    },
  ]

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="bg-indigo-600 sm:pb-32">
          <Disclosure
            as="nav"
            className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
          >
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                    {/* Logo + desktop nav */}
                    <div className="flex w-10 items-center px-2 sm:w-full lg:px-0">
                      <div className="flex-shrink-0">
                        <Link to={routes.home()}>
                          <YurtleLogo className="h-10 w-10" />
                        </Link>
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {(user
                            ? [...navigation, ...navSignedIn]
                            : navigation
                          ).map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={cn(
                                item.current
                                  ? 'bg-indigo-700 text-white'
                                  : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Location picker */}
                    <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                      <SetLocationPopover />
                    </div>
                    {/* Mobile nav */}
                    <div className="flex w-10 lg:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    {/* User button (desktop) */}
                    <div className="hidden lg:ml-4 lg:block">
                      <div className="flex items-center">
                        {/* TODO add notifications */}
                        {/* <button
                          type="button"
                          className="relative flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3 flex-shrink-0">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <UserProfileImg className="h-9 w-9 rounded-full fill-white" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {(user
                                ? userNavigationLoggedIn
                                : userNavigationSignedOut
                              ).map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <button
                                      onClick={item.onClick}
                                      className={cn(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </button>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={cn(
                          item.current
                            ? 'bg-indigo-700 text-white'
                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-indigo-700 pb-3 pt-4">
                    {/* user info */}
                    {user && (
                      <div className="flex items-center overflow-clip px-5">
                        <div className="flex-shrink-0">
                          <UserProfileImg className="h-10 w-10 rounded-full fill-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium text-white">
                            {user.username}
                          </div>
                          <div className="text-sm font-medium text-indigo-300">
                            {user.email}
                          </div>
                        </div>
                        {/* TODO add notifications */}
                        {/* <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-indigo-600 p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}
                      </div>
                    )}
                    <div className="mt-3 space-y-1 px-2">
                      {(user
                        ? userNavigationLoggedIn
                        : userNavigationSignedOut
                      ).map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="button"
                          onClick={item.onClick}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                <HeaderSlot />
              </h1>
            </div>
          </header>
        </div>

        <main className="flex-grow sm:-mt-32">
          <div className="mx-auto h-full max-w-7xl sm:px-6 sm:pb-12 lg:px-8">
            <div
              className={cn(
                'relative min-h-full bg-white sm:min-h-[300px] sm:rounded-lg sm:shadow',
                !withoutPadding && 'px-5 py-6 sm:px-6'
              )}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

/**
 * This is a simple header that can be used in the `HeaderSlot`.
 */
export const SimplePageHeader = ({
  title,
  subtitle,
  subtitleIsAddress,
  id,
}: {
  title: string
  subtitle?: string
  subtitleIsAddress?: boolean
  /** Optional, pass this when you need to override the header slot - ie when triggering a rerender without changing the title */
  id?: string
}) => {
  return (
    <>
      <MetaTags title={title} />
      <HeaderSlot.Plug id={id ? id : title} deps={[id, title]}>
        <span>{title}</span>
        {subtitle && (
          <span className="mt-2 block text-sm font-normal tracking-wide">
            {subtitle && subtitleIsAddress ? (
              <AddressLink
                text={subtitle}
                searchStr={`${title}, ${subtitle}`}
              />
            ) : (
              subtitle
            )}
          </span>
        )}
      </HeaderSlot.Plug>
    </>
  )
}

export default SiteLayout
