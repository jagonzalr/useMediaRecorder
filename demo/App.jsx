'use strict'

import React, { Fragment, useEffect, useState } from 'react'

import { useMediaRecorder } from '../src/index'

const App = () => {
  /* eslint-disable no-unused-vars */
  const [ref, stream, err] = useMediaRecorder()
  /* eslint-enable no-unused-vars */
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (err) {
      setShowPreview(false)
    }
  }, [err])

  const onStopPreview = e => {
    e.preventDefault()
    setShowPreview(false)
  }

  const onPreview = e => {
    e.preventDefault()
    if (!err) {
      setShowPreview(true)
    }
  }

  return (
    <Fragment>
      <h1>MediaRecorder Hook</h1>
      {err && <p style={{ color: 'red', fontSize: '1.2rem' }}>{err}</p>}
      {showPreview ? (
        <button onClick={onStopPreview}>Stop Preview</button>
      ) : (
        <button onClick={onPreview}>Preview</button>
      )}
      <div>
        {showPreview && (
          <video
            autoPlay
            muted
            ref={ref}
            id='preview'
            width='600'
            height='400'
          />
        )}
      </div>
    </Fragment>
  )
}

export default App
