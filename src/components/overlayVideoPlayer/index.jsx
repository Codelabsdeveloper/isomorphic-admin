/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Sep 18 2022 3:11:30 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import AppConfig from '@App/appConfig/AppConfig';
import React from 'react';
import dynamic from 'next/dynamic';
import { Row } from 'antd';
import Button from '@Atoms/button';
import { func } from 'prop-types';
import VideoPlayer from '@Components/videoPlayer';
import styles from './OverlayVideoPlayer.module.scss';

const VIDEO_URL = 'https://www.youtube.com/embed/f02mOEt11OQ';

const Overlay = dynamic(() => import('@Atoms/overlay'), { ssr: false });

const OverlayVideoPlayer = ({ handleSkipVideo }) => {
  const videoContent = {
    fields: {
      video: VIDEO_URL,
      showControls: false,
      loop: false,
      muted: true,
      playing: false,
    },
  };

  return (
    <>
      <Overlay>
        <Row className={styles.overlayVideoPlayer}>
          <VideoPlayer {...videoContent?.fields} url={VIDEO_URL} />
          <Row className={styles.btn} justify="end">
            <Button size="small" onClick={() => handleSkipVideo()}>
              {AppConfig.getCMSMessage('overlay.skip_video')}
            </Button>
          </Row>
        </Row>
      </Overlay>
    </>
  );
};

OverlayVideoPlayer.propTypes = {
  handleSkipVideo: func.isRequired,
};

export default OverlayVideoPlayer;
