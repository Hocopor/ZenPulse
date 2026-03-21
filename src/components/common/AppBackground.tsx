import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { gradients } from '../../constants/colors';

type Props = {
  children: React.ReactNode;
};

export function AppBackground({ children }: Props) {
  return (
    <ImageBackground
      source={require('../../assets/backgrounds/app-bg.png')}
      style={styles.background}
      imageStyle={styles.image}
      resizeMode="cover"
    >
      <LinearGradient colors={gradients.screenOverlay} style={styles.overlay} />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0F1720',
  },
  image: {
    opacity: 0.96,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
  },
});
