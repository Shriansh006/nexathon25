import React, { IframeHTMLAttributes } from 'react'

interface PreviewProps {
    previewUrl : string;
    frameRef : React.MutableRefObject<HTMLIFrameElement | null>
}

const Preview = ({previewUrl , frameRef} : PreviewProps) => {
  return (
    <div className="h-full flex items-center justify-center text-gray-500">
        <iframe ref={frameRef} className='w-full h-full' src={previewUrl}></iframe>
    </div>
  )
}

export default Preview;