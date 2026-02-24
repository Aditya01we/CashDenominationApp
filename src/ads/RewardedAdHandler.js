// src/ads/RewardedAdHandler.js
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { adId } from '../ads/adId';

let rewarded = RewardedAd.createForAdRequest(adId.rewarded, {
  requestNonPersonalizedAdsOnly: true,
});

export const showRewardedAd = (onRewardEarned) => {
  const unsubscribe = rewarded.addAdEventListener((type, error, reward) => {
    if (type === AdEventType.LOADED) {
      rewarded.show();
    }

    if (type === AdEventType.ERROR) {
      console.warn('Rewarded ad failed to load:', error);
    }

    if (type === RewardedAdEventType.EARNED_REWARD) {
      onRewardEarned && onRewardEarned(reward);
    }

    if (type === AdEventType.CLOSED) {
      // Recreate the ad instance so it can be shown again later
      rewarded = RewardedAd.createForAdRequest(adId.rewarded, {
        requestNonPersonalizedAdsOnly: true,
      });
    }
  });

  rewarded.load();

  // Optional: return unsubscribe function
  return () => {
    unsubscribe();
  };
};
