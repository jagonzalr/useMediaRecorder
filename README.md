<p>
	<a href="https://github.com/jagonzalr/useMediaRecorder/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/npm/l/use-media-recorder.svg?type=flat" alt="Github license"></a>
	<a href="https://www.npmjs.com/package/use-media-recorder" target="_blank"><img src="https://img.shields.io/npm/v/use-media-recorder.svg?type=flat" alt="npm version"></a>
</p>

# useMediaRecorder

[MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Video and audio](#video-and-audio)
  - [Audio only](#audio-only)
- [Demo](#demo)
- [License](#license)

## Getting started

`npm install --save use-media-recorder`

- Supports both video + audio and audio only recordings.
- Currently it generates `video/webm` and `audio/webm`.

## Usage

### Video and audio

```
import { useMediaRecorder } from 'use-media-recorder'
const [isRecording, setIsRecording] = useState(false)
const [setCaptureRef, data, err] = useMediaRecorder({ isRecording })
```

### Audio only

```
import { useMediaRecorder } from 'use-media-recorder'
const [isRecording, setIsRecording] = useState(false)
const [setCaptureRef, data, err] = useMediaRecorder({ isRecording, audioOnly: true })
```

Full example can be found [here](https://github.com/jagonzalr/useMediaRecorder/blob/master/demo/App.jsx)

## Demo

```
git clone git@github.com:jagonzalr/useMediaRecorder.git
cd useMediaRecorder
npm intall
npm start
```

## License

useMediaRecorder is [MIT licensed](./LICENSE).
