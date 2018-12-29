import React, { SFC } from 'react';
import { Image } from 'react-native';

const ad = require('../../../../../assets/ad.png');

export const AdBanner: SFC = () => (
    <Image
        style={{ alignSelf: 'stretch', height: '100%', width: '100%' }}
        source={ad}
        resizeMode="stretch"
    />
);
