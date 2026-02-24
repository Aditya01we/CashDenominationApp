// src/ads/InterstitialAdHandler.js
import {
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { adId } from '../ads/adId';

const interstitial = InterstitialAd.createForAdRequest(adId.interstitial);

export const showInterstitialAd = (onClosedCallback) => {
  const unsubscribe = interstitial.onAdEvent((type) => {
    if (type === AdEventType.LOADED) {
      interstitial.show();
    }
    if (type === AdEventType.CLOSED) {
      onClosedCallback && onClosedCallback();
      unsubscribe();
    }
  });

  interstitial.load();
};
