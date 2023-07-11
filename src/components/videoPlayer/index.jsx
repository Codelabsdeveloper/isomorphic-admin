/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 18 2022 2:17:57 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import Icon from '@Atoms/icon/Icon';
import { bool, func, object, string } from 'prop-types';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';

const parseSizeFromString = (str) => {
  const sizeObj = str?.split('-');
  return { width: sizeObj?.[0] ?? '100%', height: sizeObj?.[1] ?? '550px' };
};

/**
 * Component - CMS Video
 * @param {object} video - Video details
 * @param {object} previewImage - Preview Image details
 * @param {boolean} showControls - Flag to show or hide video controls
 * @returns
 */
const VideoPlayer = ({
  video,
  previewImage,
  showControls,
  videoDimensions,
  handleVideo,
  loop,
  url,
  muted,
}) => {
  if (!video) return null;

  videoDimensions;
  return (
    <ReactPlayer
      url={url}
      controls={showControls}
      pip
      playsinline
      light={previewImage || false}
      {...parseSizeFromString(videoDimensions)}
      className={styles.videoFrame}
      playIcon={<Icon iconName="play" />}
      {...(handleVideo && { onPlay: handleVideo, onPause: handleVideo })}
      volume={1}
      muted={muted}
      loop={loop}
    />
  );
};

VideoPlayer.propTypes = {
  video: string.isRequired,
  previewImage: object,
  showControls: bool,
  videoHeight: string,
  handleVideo: func,
  videoDimensions: string,
  loop: bool,
  url: string,
  muted: bool,
};

VideoPlayer.defaultProps = {
  previewImage: null,
  showControls: true,
  videoHeight: null,
  handleVideo: null,
  videoDimensions: '',
  loop: false,
  url: '',
  muted: false,
};

export default VideoPlayer;
