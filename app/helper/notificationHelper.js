import PushNotification from 'react-native-push-notification';

export const configureNotificationService = () => {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);

      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
};
export const createNotificationChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'weather-testing-app', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
export const sendLocalNotification = (iconName, currentTemprature) => {
  PushNotification.localNotification({
    /* Android Only Properties */
    channelId: 'weather-testing-app', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    largeIconUrl: 'http://openweathermap.org/img/w/' + iconName + '.png', // (optional) default: undefined
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: 'Current Temprature: ' + currentTemprature, // (optional) default: "message" prop
    subText: '', // (optional) default: none
    bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: 'high', // (optional) set notification priority, default: high
    visibility: 'private', // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    /* iOS only properties */
    category: '', // (optional) default: empty string

    /* iOS and Android properties */
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: 'Weather App', // (optional)
    message: 'Current Temprature: ' + currentTemprature, // (required)
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
  });
};
