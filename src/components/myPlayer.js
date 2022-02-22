import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
export const MyPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const videoJsOptions = {
        // lookup the options in the docs for more options
        autoplay: true,
        controls: true,
        responsive: true,
        preload: 'auto',
        fluid: true,
        playbackRates: [1, 1.5, 2, 2.5],
        inactivityTimeout: false,
        durationDisplay: true,
        controlBar: {
          volumePanel: {
            inline: false,
            CurrentTimeDisplay: true,
          },
          currentTimeDisplay: true,
          timeDivider: true,
          durationDisplay: true,
          pictureInPictureToggle: true,
          fullscreenToggle: true,
        },
        sources: [
          // 视频来源路径
          {
            src: '//vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4',
            poster: '//vjs.zencdn.net/v/oceans.png',
          },
        ],
      };
      const player = (playerRef.current = videojs(
        videoElement,
        { ...videoJsOptions, ...options },
        () => {
          onReady && onReady(player);
        },
      ));
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default MyPlayer;
