# 💰 Cash Denomination App

A powerful and user-friendly **Cash Denomination Counter App** built using **React Native**.

This application helps users calculate total cash based on different currency denominations.  
It is especially useful for shopkeepers, cashiers, accountants, and daily cash handling operations.

This project was bootstrapped using [@react-native-community/cli](https://github.com/react-native-community/cli).

---

## 📱 App Features

- ✅ Add multiple currency denominations (₹2000 – ₹1 or customizable)
- ✅ Automatic total amount calculation
- ✅ Convert total amount into words
- ✅ Save cash entries with name & date
- ✅ View saved entries history
- ✅ Delete / Clear all entries
- ✅ Share tally (Text & PDF format)
- ✅ Drawer navigation
- ✅ Light / Dark theme support
- ✅ Clean Blue & White professional UI
- ✅ AsyncStorage support for local data saving

---


```

---

# 🚀 Getting Started

> **Note**: Make sure you have completed the React Native Environment Setup  
https://reactnative.dev/docs/set-up-your-environment

---

## 📦 Step 1: Install Dependencies

From the root directory of your project:

```bash
# Using npm
npm install

# OR using Yarn
yarn
```

---

## 🔥 Step 2: Start Metro Server

Metro is the JavaScript bundler for React Native.

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

---

## ▶ Step 3: Run the Application

Open a new terminal from the project root and run:

---

### 🤖 Run on Android

```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

Requirements:
- Android Studio installed
- Emulator running OR physical device connected

---

### 🍎 Run on iOS (Mac only)

Install CocoaPods (first time only):

```bash
bundle install
bundle exec pod install
```

Then run:

```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

---

# 🔄 Fast Refresh

When you modify files like `App.js` or any screen file:

- App updates automatically
- This feature is powered by Fast Refresh

Force Reload:

### Android
- Press `R` twice
- Or `Ctrl + M` → Reload

### iOS
- Press `R` in simulator

---

# 🛠️ Build Release APK (Android)

To generate release APK:

```bash
npx react-native build-android --mode=release
```

APK location:

```
android/app/build/outputs/apk/release/
```

---

# 📦 Key Dependencies

- react-navigation
- @react-native-async-storage/async-storage
- react-native-vector-icons
- react-native-share
- redux / @reduxjs/toolkit (if implemented)

---

# 💾 Data Storage

This app uses:

- AsyncStorage for local data persistence
- Local state management for real-time calculations
- Redux Toolkit (optional, if implemented)

---

# 🔐 Environment Variables

If using API keys or secrets:

Create `.env` file:

```
API_URL=your_api_url_here
```

Make sure `.env` is added to `.gitignore`.

---

# 🧪 Troubleshooting

Clear Metro cache:

```bash
npx react-native start --reset-cache
```

Delete node_modules & reinstall:

```bash
rm -rf node_modules
npm install
```

More help:
https://reactnative.dev/docs/troubleshooting

---

# 📚 Learn More

- React Native Docs: https://reactnative.dev
- Environment Setup: https://reactnative.dev/docs/environment-setup
- React Native GitHub: https://github.com/facebook/react-native

---

# 👨‍💻 Author

**Aditya Bhardwaj**

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork it
- 🛠 Contribute

---

# 🚀 Future Enhancements

- Cloud backup support
- Export to Excel
- Multi-currency support
- User authentication
- Dashboard analytics

---

💰 Happy Coding & Smart Cash Counting!"# CashDenominationApp" 
