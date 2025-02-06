import { NextPageContext } from 'next'
import SEO from '@/components/SEO'

const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  return (
    <>
      <SEO 
        title={`Error ${statusCode}`}
        description={`An error occurred on ${statusCode ? 'server' : 'client'}`}
      />
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p className="text-xl">We apologize for the inconvenience.</p>
      </div>
    </>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
