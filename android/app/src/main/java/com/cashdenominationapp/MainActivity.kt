package com.cashdenominationapp

import android.os.Bundle
import com.facebook.FacebookSdk
import com.facebook.appevents.AppEventsLogger
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.LoggingBehavior

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "CashDenominationApp"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // Manually initialize the Facebook SDK
    FacebookSdk.setAutoInitEnabled(true)
    FacebookSdk.setAutoLogAppEventsEnabled(true)
    FacebookSdk.setAdvertiserIDCollectionEnabled(true)
    FacebookSdk.sdkInitialize(applicationContext)
    AppEventsLogger.activateApp(application)

    // Optional: Enable debug logs for development
    FacebookSdk.setIsDebugEnabled(true)
    FacebookSdk.addLoggingBehavior(LoggingBehavior.APP_EVENTS)
  }
}
