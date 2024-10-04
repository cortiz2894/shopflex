import React from 'react';

interface VideoPlayerProps {
  mp4Src: string;
  webmSrc: string;
  poster?: string;
  width?: string;
  height?: string;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  mp4Src,
  webmSrc,
  poster,
  width = '100%',
  height = 'auto',
  className,
  autoplay = false,
  controls = true,
  loop = false,
}) => {
  return (
    <video
      className={className}
      width={width}
      height={height}
      poster={poster}
      autoPlay={autoplay}
      controls={controls}
      loop={loop}
      muted
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
