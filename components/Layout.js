import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children, locale, locales, defaultLocale, config }) => {
  console.log('config', config)
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
