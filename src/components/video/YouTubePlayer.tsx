/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#youtube-embed
 */

import { YouTubeEmbed } from "@next/third-parties/google";

// 4. The API will call this function when the video player is ready.
export function onPlayerReady(event) {
  event.target.playVideo();
}

export const getPlayer = (videoid: string) => {
  console.log("====================================");
  console.log("videoid:", videoid);
  console.log("====================================");
  return document.querySelector("lite-youtube");
};
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

export function onPlayerStateChange(event: YT.OnStateChangeEvent, stop) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const data = event?.data;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const PLAYING = YT.PlayerState.PLAYING;
  if (data === PLAYING && !stop) {
    setTimeout(stopVideo, 6000);
    stop = true;
  }
}

export function stopVideo(player: YT.Player) {
  player.stopVideo();
}

export default function YouTubePlayer({
  videoID,
  height,
  params,
  playLabel,
  style,
}: {
  id: string;
  videoID: string;
  height?: number | undefined;
  params?: string;
  playLabel?: string;
  style?: string;
  title?: string;
}) {
  return (
    <YouTubeEmbed
      videoid={videoID}
      height={height}
      params={params}
      playlabel={playLabel}
      style={style}
    />
  );
}
