import { useState, useCallback, useRef } from 'react';

interface RecordingOptions {
  duration?: number; // seconds
  fps?: number;
  quality?: number; // 0-1
  format?: 'webm' | 'mp4';
  canvas?: HTMLCanvasElement;
}

export const useVideoRecorder = (canvas?: HTMLCanvasElement) => {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(
    async (options: RecordingOptions = {}) => {
      const {
        duration = 60, // 60 seconds for full camera loop
        fps = 60,
        format = 'webm',
      } = options;

      if (!canvas) {
        console.error('Canvas not available for recording');
        return;
      }

      try {
        // Get canvas stream
        const stream = canvas.captureStream(fps);

        // Configure MediaRecorder
        const mimeType = format === 'mp4' ? 'video/mp4' : 'video/webm;codecs=vp9';

        if (!MediaRecorder.isTypeSupported(mimeType)) {
          console.warn(`${mimeType} not supported, falling back to webm`);
        }

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: MediaRecorder.isTypeSupported(mimeType)
            ? mimeType
            : 'video/webm',
          videoBitsPerSecond: 8000000, // 8 Mbps for high quality
        });

        chunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, {
            type: format === 'mp4' ? 'video/mp4' : 'video/webm',
          });

          // Download the video
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `bitcoin-art-${Date.now()}.${format}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          setIsRecording(false);
          setProgress(0);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start(100); // Collect data every 100ms
        setIsRecording(true);

        // Calculate exact duration for perfect loop
        // We need to stop 1 frame before the end so it loops seamlessly
        const frameTime = 1 / fps; // Duration of one frame in seconds
        const actualDuration = duration - frameTime; // Stop 1 frame early

        // Track progress
        const startTime = Date.now();
        const progressInterval = setInterval(() => {
          const elapsed = (Date.now() - startTime) / 1000;
          const progressPercent = Math.min((elapsed / actualDuration) * 100, 100);
          setProgress(progressPercent);

          if (elapsed >= actualDuration) {
            clearInterval(progressInterval);
            stopRecording();
          }
        }, 100);

        console.log(`Recording started: ${actualDuration.toFixed(3)}s at ${fps}fps (${Math.floor(actualDuration * fps)} frames for perfect loop)`);
      } catch (error) {
        console.error('Failed to start recording:', error);
        setIsRecording(false);
      }
    },
    [canvas]
  );

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  }, [isRecording]);

  return {
    isRecording,
    progress,
    startRecording,
    stopRecording,
  };
};
