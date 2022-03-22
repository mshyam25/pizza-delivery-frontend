import React from 'react'
import { Spinner, Button } from 'react-bootstrap'

const Loader = () => {
  return (
    <>
      <Button variant='secondary' disabled>
        <Spinner
          as='span'
          animation='border'
          size='md'
          role='status'
          aria-hidden='true'
        />
        <span className='visually-hidden'>Loading...</span>
      </Button>{' '}
      <Button variant='secondary' disabled>
        <Spinner
          as='span'
          animation='grow'
          size='md'
          role='status'
          aria-hidden='true'
        />
        Loading...
      </Button>
    </>
  )
}

export default Loader
