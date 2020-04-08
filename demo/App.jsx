'use strict'

import React, { Fragment, useEffect, useRef, useState } from 'react'

import { useMediaRecorder } from '../src/index'

const App = () => {
  const recordingRef = useRef(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showRecording, setShowRecording] = useState(false)
  const [recordingUrl, setRecordingUrl] = useState(null)
  const [setCaptureRef, data, err] = useMediaRecorder(isRecording)

  useEffect(() => {
    if (err) {
      setShowPreview(false)
    }
  }, [err])

  useEffect(() => {
    if (data) {
      const blob = new Blob(data, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setRecordingUrl(url)
    }
  }, [data])

  useEffect(() => {
    if (showRecording && recordingUrl) {
      recordingRef.current.src = recordingUrl
    }
  }, [showRecording])

  const onStartPreview = e => {
    e.preventDefault()
    if (!err) {
      setShowPreview(true)
    }
  }

  const onStopPreview = e => {
    e.preventDefault()
    setShowPreview(false)
    setShowRecording(false)
    setRecordingUrl(null)
  }

  const onStartRecording = e => {
    e.preventDefault()
    setIsRecording(true)
  }

  const onStopRecording = e => {
    e.preventDefault()
    setIsRecording(false)
  }

  const onShowRecording = e => {
    e.preventDefault()
    setShowRecording(true)
  }

  const onHideRecording = e => {
    e.preventDefault()
    setShowRecording(false)
  }

  return (
    <Fragment>
      <h1>useMediaRecorder</h1>
      {err && <p style={{ color: 'red', fontSize: '1.2rem' }}>{err}</p>}
      <div>
        {!showPreview && (
          <button onClick={onStartPreview}>Start Preview</button>
        )}
        {showPreview && !isRecording && !showRecording && (
          <button onClick={onStopPreview}>Stop Preview</button>
        )}
        {showPreview && !isRecording && !showRecording && (
          <button onClick={onStartRecording}>Start Recording</button>
        )}
        {isRecording && (
          <button onClick={onStopRecording}>Stop Recording</button>
        )}
        {recordingUrl && (
          <Fragment>
            {!showRecording && (
              <button onClick={onShowRecording}>Show Recording</button>
            )}
            {showRecording && (
              <button onClick={onHideRecording}>Hide Recording</button>
            )}
            <a href={recordingUrl} download={'recording.webm'}>
              Download
            </a>
          </Fragment>
        )}
      </div>
      {showPreview && !showRecording && (
        <div>
          <video
            autoPlay
            muted
            ref={setCaptureRef}
            id='capture'
            width='600'
            height='400'
          />
        </div>
      )}
      {showRecording && (
        <div>
          <video
            controls
            ref={recordingRef}
            id='recording'
            width='600'
            height='400'
          />
        </div>
      )}
    </Fragment>
  )
}

export default App
