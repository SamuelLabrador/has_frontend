import videojs from 'video.js';
import React, { Component } from 'react';
const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'rtmp://wzmedia.dot.ca.gov/D4/W580_JWO_24_IC.stream',
    type: 'rtmp/flv'
  }]
}
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js"></video>
        </div>
      </div>
    )
  }
}