// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import SiteLayout from './layouts/SiteLayout/SiteLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={WelcomePage} name="welcome" />
      <Set wrap={SiteLayout}>
        <Route path="/business" page={BusinessPage} name="business" />
        <Route path="/location/{id}" page={LocationPage} name="location" />
        <Route path="/search-nearby" page={SearchNearbyPage} name="searchNearby" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
