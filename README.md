# Getting Started

- NodeJS v22.21.0
- Npm v10.9.4
- Bun v1.1.34
- Ruby v3.1.6p260 arm64-darwin24
- Android Studio v2024.3.2 Patch 1
- Xcode v26.1.1

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using bun
bun start

# OR using npm
npm start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using bun
bun android

# OR using npm
npm run android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
# Using bun
bun pod-cocoa

# OR using npm
npm run pod-cocoa
```

Then, and every time you update your native dependencies, run:

```sh
# Using bun
bun pod-install

# OR using npm
npm run pod-install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using bun
bun ios

# OR using npm
npm run ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.
