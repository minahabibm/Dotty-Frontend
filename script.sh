#!/bin/bash

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules

# Clear Watchman cache
# watchman watch-del-all

# Clear Metro Bundler cache
rm -rf $TMPDIR/metro-cache

# Remove Expo build caches
rm -rf .expo
rm -rf .expo-shared

# Unset environment variables
unset $(cat .env | cut -d= -f1 | xargs)
unset $(cat .env.development | cut -d= -f1 | xargs)
unset $(cat .env.staging | cut -d= -f1 | xargs)
unset $(cat .env.production | cut -d= -f1 | xargs)

# Start Expo with clear cache
npm install

# Access command-line argument directly
ENV=$1

# Conditional statement using the variable
if [ "${ENV}" = "dev" ]; then
    npm run start:development -c
elif [ "${ENV}" = "prod" ]; then
    npm run start:production -c
elif [ -n "${ENV}" ]; then
    npm run start:${ENV} -c
else
    npm run start -c
fi













# Clear Yarn cache
# yarn cache clean

# rm -rf /tmp/metro-*

# RN < 0.50 - watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules/ && npm cache clean && npm install && npm start -- --reset-cache
# RN >= 0.50 -  watchman watch-del-all && rm -rf $TMPDIR/react-native-packager-cache-* && rm -rf $TMPDIR/metro-bundler-cache-* && rm -rf node_modules/ && npm cache clean && npm install && npm start -- --reset-cache
# RN >= 0.63 - watchman watch-del-all && rm -rf node_modules && npm install && rm -rf /tmp/metro-* && npm run start --reset-cache

# npm >= 5 - watchman watch-del-all && rm -rf $TMPDIR/react-* && rm -rf node_modules/ && npm cache verify && npm install && npm start -- --reset-cache

# Windows - del %appdata%\Temp\react-native-* & cd android & gradlew clean & cd .. & del node_modules/ & npm cache clean --force & npm install & npm start -- --reset-cache