// src/ads/adUnitIds.js
import { Platform } from 'react-native';

export const adId = {
  banner: __DEV__
    ? 'ca-app-pub-3940256099942544/6300978111'
    : Platform.select({
        android: 'ca-app-pub-8990309087739897/5867636823',
      }),
  interstitial: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712'
    : Platform.select({
        android: 'ca-app-pub-8990309087739897/1298670571',
      }),
  rewarded: __DEV__
    ? 'ca-app-pub-3940256099942544/5224354917'
    : Platform.select({
        android: 'ca-app-pub-8990309087739897/8988316695',
      }),
};
