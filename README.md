[![Github license](https://img.shields.io/npm/l/use-media-recorder.svg?type=flat)(https://github.com/jagonzalr/useMediaRecorder/blob/master/README.md)] [![npm version](https://img.shields.io/npm/v/use-media-recorder.svg?type=flat)(https://www.npmjs.com/package/use-media-recorder)]

# useMediaRecorder

[MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Installation

`npm install --save use-media-recorder`

## Usage

### Video

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
