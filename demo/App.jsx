'use strict'

import React, { Fragment, useEffect, useRef, useState } from 'react'

import { useMediaRecorder } from '../src/index'

import './styles/tailwind.css'
import './styles/index.scss'

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
    <div className='container mx-auto px-3 py-2'>
      <h1 className='bold font-bold text-3xl'>useMediaRecorder</h1>
      {err && <p style={{ color: 'red', fontSize: '1.2rem' }}>{err}</p>}
      <div className='flex mt-2'>
        {!showPreview && (
          <button onClick={onStartPreview} className='flex-shrink mr-2'>
            Start Preview
          </button>
        )}
        {showPreview && !isRecording && !showRecording && (
          <button onClick={onStopPreview} className='flex-shrink mr-2'>
            Stop Preview
          </button>
        )}
        {showPreview && !isRecording && !showRecording && (
          <button onClick={onStartRecording} className='flex-shrink mr-2'>
            Start Recording
          </button>
        )}
        {isRecording && (
          <button onClick={onStopRecording} className='flex-shrink mr-2'>
            Stop Recording
          </button>
        )}
        {recordingUrl && (
          <Fragment>
            {!showRecording && (
              <button onClick={onShowRecording} className='flex-shrink mr-2'>
                Show Recording
              </button>
            )}
            {showRecording && (
              <button onClick={onHideRecording} className='flex-shrink mr-2'>
                Hide Recording
              </button>
            )}
            <a
              href={recordingUrl}
              download={'recording.webm'}
              className='flex-shrink mr-2 button'
            >
              Download
            </a>
          </Fragment>
        )}
      </div>
      <div className='mt-2'>
        {showPreview && !showRecording && (
          <video
            autoPlay
            muted
            ref={setCaptureRef}
            id='capture'
            width='600'
            height='400'
          />
        )}
        {showRecording && (
          <video
            controls
            ref={recordingRef}
            id='recording'
            width='600'
            height='400'
          />
        )}
      </div>
    </div>
  )
}

export default App
