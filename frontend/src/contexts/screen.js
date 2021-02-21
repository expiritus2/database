import { createContext } from 'react';
import { DESKTOP, MOBILE, MOBILE_SMALL } from 'settings/constants/screen';

const { innerWidth, innerHeight } = window;

const width = innerWidth;
const height = innerHeight;
const desktopWidth = width > DESKTOP;
const tabletWidth = width <= DESKTOP && width > MOBILE;
const mobileWidth = width <= MOBILE;
const mobileSmallWidth = width <= MOBILE_SMALL;

export function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    const result = {
        windowsPhone: false,
        android: false,
        ios: false,
    };

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        result.windowsPhone = true;
    }

    if (/android/i.test(userAgent)) {
        result.android = true;
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        result.ios = true;
    }

    return result;
}

const mobileOS = getMobileOperatingSystem();

export default createContext({
    screen: {
        width,
        height,
        desktopWidth,
        tabletWidth,
        mobileWidth,
        mobileSmallWidth,
    },
    mobileOS,
    isMobile: Object.values(mobileOS).some((os) => os),
});
