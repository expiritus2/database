import { useEffect, useState, useCallback } from 'react';
import { DESKTOP, MOBILE, MOBILE_SMALL } from 'settings/constants/screen';
import { getMobileOperatingSystem } from 'contexts/screen';

const useResize = () => {
    const [screen, setScreen] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        desktopWidth: window.innerWidth > DESKTOP,
        tabletWidth: window.innerWidth <= DESKTOP && window.innerWidth > MOBILE,
        mobileWidth: window.innerWidth <= MOBILE,
        mobileSmallWidth: window.innerWidth <= MOBILE_SMALL,
    });

    const handleResize = useCallback(() => {
        const { innerWidth, innerHeight } = window;

        const width = innerWidth;
        const height = innerHeight;
        const desktopWidth = width > DESKTOP;
        const tabletWidth = width <= DESKTOP && width > MOBILE;
        const mobileWidth = width <= MOBILE;
        const mobileSmallWidth = width <= MOBILE_SMALL;

        setScreen({ width, height, desktopWidth, tabletWidth, mobileWidth, mobileSmallWidth });
    }, []);

    const mobileOS = getMobileOperatingSystem();
    const isMobile = Object.values(mobileOS).some((os) => os);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []); // eslint-disable-line

    return { screen, mobileOS, isMobile };
};

export default useResize;
