// src/ads/BannerAdComponent.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { adId } from '../ads/adId';

const BannerAdComponent = () => (
  <View style={styles.adContainer}>
    <BannerAd
      unitId={adId.banner}
      size={BannerAdSize.ADAPTIVE_BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      onAdLoaded={() => console.log('Banner loaded')}
      onAdFailedToLoad={(error) => console.error('Banner failed', error)}
    />
  </View>
);

const styles = StyleSheet.create({
  adContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default BannerAdComponent;
