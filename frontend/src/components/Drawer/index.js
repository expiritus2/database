import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getIsAuthSelector } from 'store/selectors/auth';
import { useScreen } from 'hooks';
import { hasVerticalScroll } from 'helpers';

import styles from './styles.module.scss';

const Drawer = (props) => {
    const { isOpen, children, className, position, onClose, header, shouldDisableScroll } = props;
    const { opacityLayerClassName, hideOpacityLayer, zIndex, contentClassName, keepAlive } = props;

    const isAuth = useSelector(getIsAuthSelector);

    const { screen } = useScreen();

    const disableScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
        const offsetPx = `${screen.scrollbarWidth}px`;

        if (position === Drawer.RIGHT) {
            document.body.style.marginRight = offsetPx;
        }
    }, [position, screen.scrollbarWidth]);

    useEffect(() => {
        if (!shouldDisableScroll || position === Drawer.LEFT) return null;

        if (isOpen && hasVerticalScroll()) {
            disableScroll();
            setTimeout(disableScroll, 300);
        }
    }, [isOpen]); // eslint-disable-line

    if (!isAuth) return null;

    return createPortal(
        <div
            style={{ zIndex: zIndex || undefined }}
            className={classNames(styles.drawer, { [styles.isOpen]: isOpen }, className)}
        >
            <div
                onClick={onClose}
                className={classNames(
                    styles.opacityLayer,
                    { [styles.hideOpacityLayer]: hideOpacityLayer },
                    opacityLayerClassName,
                )}
            />
            <div className={classNames(styles.content, styles[position], contentClassName)}>
                {(isOpen || keepAlive) && (
                    <>
                        {header}
                        {children}
                    </>
                )}
            </div>
        </div>,
        document.body,
    );
};

Drawer.RIGHT = 'right';
Drawer.LEFT = 'left';

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    opacityLayerClassName: PropTypes.string,
    position: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    refs: PropTypes.arrayOf(PropTypes.any),
    onClose: PropTypes.func,
    shouldDisableScroll: PropTypes.bool,
    hideOpacityLayer: PropTypes.bool,
    zIndex: PropTypes.number,
    keepAlive: PropTypes.bool,
};

Drawer.defaultProps = {
    className: '',
    contentClassName: '',
    opacityLayerClassName: '',
    position: Drawer.LEFT,
    refs: [],
    onClose: () => {},
    shouldDisableScroll: true,
    hideOpacityLayer: false,
    zIndex: undefined,
    keepAlive: false,
};

export default Drawer;
