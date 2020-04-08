'use strict'

import { useEffect, useState } from 'react'

async function getUserMedia(setStream, setErr) {
  try {
    const options = { video: true, audio: true }
    const stream = await navigator.mediaDevices.getUserMedia(options)
    setStream(stream)
  } catch (err) {
    setErr(err.message)
  }
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

export const useMediaRecorder = () => {
  const [err, setErr] = useState(null)
  const [stream, setStream] = useState({})
  const [ref, setRef] = useState(null)

  useEffect(() => {
    if (ref) {
      getUserMedia(setStream, setErr)
    } else if (stream.id) {
      removeTracks(stream)
      setStream({})
    }
  }, [ref])

  useEffect(() => {
    if (stream.id) {
      ref.srcObject = stream
    }
  }, [stream.id])

  return [setRef, stream, err]
}
