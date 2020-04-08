# useMediaRecorder
[MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) using [React hooks](https://reactjs.org/docs/hooks-intro.html).

## Installation
`npm install --save use-media-recorder`

## Usage
```
import { useMediaRecorder } from 'use-media-recorder'
const [isRecording, setIsRecording] = useState(false)
const [setCaptureRef, data, err] = useMediaRecorder(isRecording)
```

Full example can be found [here](https://github.com/jagonzalr/useMediaRecorder/blob/master/demo/App.jsx)

## Demo
```
git clone git@github.com:jagonzalr/useMediaRecorder.git
cd useMediaRecorder
npm intall
npm start
```
