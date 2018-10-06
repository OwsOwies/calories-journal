#This is official Nextapps React-Native KaloriePIT

It consists of the most common libraries used in react-native development.
For static type checking we use **TypeScript** instead of facebooks flow, due to flows server eating a lot of resources on windows.

##Dependency Manager

We use yarn across all our React-Native projects.
Please don't use npm and adjust to all people in our team.

https://yarnpkg.com/lang/en/

##Set Up

For git repository duplicating refer here:

https://help.github.com/articles/duplicating-a-repository/

After new repository set up:
* search for all **KaloriePIT** string occurences and change them accordingly to your new apps name.
* run yarn install
* you are good to go :)

There's fake **auth** module which acts as styleguide for your future modules.

##Included libraries

Here's a list of libraries included in this KaloriePIT

###React-Native

React Native lets you build mobile apps using only JavaScript. It uses the same design as React, letting you compose a rich mobile UI from declarative components.

https://facebook.github.io/react-native/

###NativeBase

Essential cross-platform UI components for React Native & Vue Native.

https://nativebase.io/

###RxJS

Reactive Extensions Library for JavaScript.

https://rxjs-dev.firebaseapp.com/

###Redux + React Redux + Reselect + Redux Observable

Redux is a predictable state container for JavaScript apps.

https://github.com/reduxjs/redux
https://github.com/reduxjs/react-redux


Reselect is simple “selector” library for Redux.

https://github.com/reduxjs/reselect


Redux Observable is RxJS 6-based middleware for Redux. Compose and cancel async actions to create side effects and more.
https://redux-observable.js.org/

###React Native Navigation

React Native Navigation provides 100% native platform navigation on both iOS and Android for React Native apps.

https://github.com/wix/react-native-navigation

###Ramda

A practical functional library for JavaScript programmers.

https://ramdajs.com/

###Jest

Javascript testing library.

https://jestjs.io/

###React Native Extended StyleSheet

Drop-in replacement of React Native StyleSheet with media-queries, variables, dynamic themes, relative units, percents, math operations,scaling and other styling stuff.

https://github.com/vitalets/react-native-extended-stylesheet

###React Native Vector Icons

Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project.

https://github.com/oblador/react-native-vector-icons

##Coding guide

We use **prettier** for code styling, which properties are defined in _.prettierrc_.

For code readability, maintainability, and functionality errors we use **TSLint**, which properies are defined in _tsconfig.json_.

Make sure to add those extensions to your IDE to keep the standard.

For VSCode their names are:
* **Prettier - Code formatter**
* **TSLint**

##Missing typings

There are some missing typescript typings in included libraries.
Their definitions are included in _typings.d.ts_, make sure to update them if necessary.

##Scripts

There are some scripts already included in this KaloriePIT, you can run them using **yarn script_name**.

* **android** - runs app android on device or emulator
* **start** - starts react natives packager
* **test** - runs jest tests
* **lint** - runs linter to check for code and typing errors

##Maintainig

Some things can break due to rapid changes in some libraries.
If this repository doesn't work properly on fresh build try using exact package versions from **package.json** without "^".