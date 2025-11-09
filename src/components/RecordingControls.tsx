import { useState, useEffect } from 'react';
import { useVideoRecorder } from '../hooks/useVideoRecorder';

export const RecordingControls = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const { isRecording, progress, startRecording, stopRecording } = useVideoRecorder(canvas || undefined);
  const [duration, setDuration] = useState(60); // Default 60s for full loop
  const [fps, setFps] = useState(60);

  // Find the canvas element on mount
  useEffect(() => {
    const canvasElement = document.querySelector('canvas');
    if (canvasElement) {
      setCanvas(canvasElement);
    }
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px',
        borderRadius: '12px',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        zIndex: 1000,
        minWidth: '280px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: '600' }}>
        🎥 Video Export
      </h3>

      {!isRecording ? (
        <>
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '12px',
                opacity: 0.8,
              }}
            >
              Duration (seconds)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min={1}
              max={120}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '14px',
              }}
            />
            <small style={{ opacity: 0.6, fontSize: '11px' }}>
              Recommended: 60s for full camera loop
            </small>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '12px',
                opacity: 0.8,
              }}
            >
              Frame Rate (FPS)
            </label>
            <select
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '14px',
              }}
            >
              <option value={30}>30 FPS (smaller file)</option>
              <option value={60}>60 FPS (smooth)</option>
            </select>
          </div>

          <button
            onClick={() => startRecording({ duration, fps, quality: 0.95, format: 'webm' })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#f7931a',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ff9f2e';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f7931a';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ⏺ Start Recording
          </button>

          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              background: 'rgba(247, 147, 26, 0.1)',
              borderRadius: '6px',
              fontSize: '11px',
              lineHeight: '1.4',
            }}
          >
            <strong>💡 Tip:</strong> The camera takes 60 seconds to complete one
            full loop. Recording for 60s will give you a perfect looping video!
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: '15px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '12px',
              }}
            >
              <span>Recording...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#f7931a',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>

          <button
            onClick={stopRecording}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#dc2626',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            ⏹ Stop Recording
          </button>

          <div
            style={{
              marginTop: '10px',
              fontSize: '11px',
              opacity: 0.7,
              textAlign: 'center',
            }}
          >
            Recording will auto-stop at {duration}s
          </div>
        </>
      )}

      <div
        style={{
          marginTop: '15px',
          paddingTop: '15px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '10px',
          opacity: 0.5,
        }}
      >
        Press 'R' to toggle this panel
      </div>
    </div>
  );
};
