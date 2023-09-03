// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import SiteLayout from './layouts/SiteLayout/SiteLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={WelcomePage} name="welcome" />
      <Set wrap={SiteLayout}>
        <Route path="/event/{id}" page={EventPage} name="event" />
        <Route path="/business/{id}" page={BusinessPage} name="business" />
        <Route path="/search-nearby" page={SearchNearbyPage} name="searchNearby" />
        <Route path="/search-for-venue" page={SearchForVenuePage} name="searchForVenue" />
        <Route path="/search-for-venue/{searchQuery}" page={SearchForVenuePage} name="searchForVenueWithQuery" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <Set wrap={SiteLayout} withoutPadding>
        <Route path="/location/{id}" page={LocationPage} name="location" />
      </Set>
    </Router>
  )
}

export default Routes
