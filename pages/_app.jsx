import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div className='mobile'>
        <p>unfortunately the adaptive version is not ready yet</p>
      </div>
    </>
  )
}

export default MyApp
