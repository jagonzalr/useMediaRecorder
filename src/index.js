'use strict'

import { useEffect, useState } from 'react'

export const useMediaRecorder = isRecording => {
  const [err, setErr] = useState(null)
  const [data, setData] = useState(null)
  const [recorder, setRecorder] = useState(null)
  const [ref, setRef] = useState(null)
  const [stream, setStream] = useState({})

  useEffect(() => {
    if (ref) {
      getUserMedia(setStream, setErr)
    } else if (stream.id) {
      removeTracks(stream)
      setStream({})
      if (recorder) setRecorder(null)
      if (data) setData(null)
    }
  }, [ref])

  useEffect(() => {
    if (stream.id) {
      ref.srcObject = stream
      ref.captureStream = ref.captureStream || ref.mozCaptureStream
    }
  }, [stream.id])

  useEffect(() => {
    if (isRecording) {
      if (!MediaRecorder) {
        setErr('Unsupported browser')
      } else {
        setData(null)
        let chunks = []

        const mediaRecorder = new MediaRecorder(ref.captureStream())
        mediaRecorder.ondataavailable = e => chunks.push(e.data)
        mediaRecorder.onerror = e => setErr(getRecorderError(e.error))
        mediaRecorder.onstop = () => setData(chunks)
        mediaRecorder.start(10)

        setRecorder(mediaRecorder)
      }
    } else if (recorder) {
      recorder.stop()
    }
  }, [isRecording])

  return [setRef, data, err]
}

async function getUserMedia(setStream, setErr) {
  try {
    const options = { video: true, audio: true }
    const stream = await navigator.mediaDevices.getUserMedia(options)
    setStream(stream)
  } catch (err) {
    setErr(err.message)
  }
}

function getRecorderError(error) {
  let errMessage = null
  switch (error.name) {
    case 'InvalidStateError':
      errMessage = 'An error occurred while recording. Try again later.'
      break
    case 'SecurityError':
      errMessage = 'Recording is not allowed due to security restrictions.'
      break
    default:
      errMessage = 'An error occurred while recording. Try again later.'
      break
  }

  return errMessage
}

function getTracks(stream) {
  return stream.getTracks()
}

function removeTrack(stream, track) {
  track.stop()
  stream.removeTrack(track)
}

function removeTracks(stream) {
  const tracks = getTracks(stream)
  if (tracks && tracks.length > 0) {
    tracks.forEach(track => {
      removeTrack(stream, track)
    })
  }
}
