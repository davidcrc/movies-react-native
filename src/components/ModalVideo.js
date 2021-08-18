import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Modal, IconButton, Title } from 'react-native-paper';
import YouTube from 'react-native-youtube';
import { getVideoMovieApi } from '../api/movies';
import { WebView } from 'react-native-webview';

const ModalVideo = props => {
  const { show, setShow, idMovie } = props;
  const [video, setVideo] = useState(null);

  const getVideoMovie = async idMovie => {
    const response = await getVideoMovieApi(idMovie);
    // console.log('el resp', response.results);
    let idVideo = null;
    response.results.forEach((video, index) => {
      if (video.site === 'YouTube' && !idVideo) {
        idVideo = video.key;
      }
    });
    setVideo(idVideo);
  };

  useEffect(() => {
    getVideoMovie(idMovie);
  }, []);

  return (
    <Modal visible={show} contentContainerStyle={styles.modal}>
      {Platform.OS === 'ios' ? (
        <YouTube videoId={video} styles={styles.video} />
      ) : (
        <WebView
          style={{ width: 500 }}
          source={{
            uri: `https://www.youtube.com/embed/${video}?controls=0&showinfo=0`,
          }}
        />
      )}
      <Text> {video} </Text>
      <IconButton
        icon="close"
        onPress={() => setShow(false)}
        style={styles.close}
      />
    </Modal>
  );
};

export default ModalVideo;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#000',
    height: '120%',
    alignItems: 'center',
  },
  close: {
    backgroundColor: '#1ea1f2',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 100,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});
