import React, { useEffect, useState } from 'react';

interface PreviewProps {
  previewUrl: string;
  frameRef: React.MutableRefObject<HTMLIFrameElement | null>;
  executing: boolean;
}

const Preview = ({ previewUrl, frameRef, executing }: PreviewProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (executing) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 80 ? prev + 0.25 : prev));
      }, 300);
    } else {
      // Jump to 100% when executing becomes false
      setProgress(100);
      setTimeout(() => setProgress(0), 500); // Reset progress after a delay
    }

    return () => clearInterval(interval);
  }, [executing]);

  return (
    <div className="h-full relative flex flex-col items-center justify-center text-gray-500">
      {/* Progress bar within preview scope */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
        <div
          className="h-full bg-yellow-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Preview Content */}
      {!previewUrl ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-center font-semibold">Preview</span>
        </div>
      ) : (
        <iframe ref={frameRef} className="w-full h-full" src={previewUrl}></iframe>
      )}
    </div>
  );
};

export default Preview;
