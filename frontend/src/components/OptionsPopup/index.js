import React, { forwardRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';
import { useScreen } from '../../hooks';

const OptionsPopup = forwardRef((props, ref) => {
    const { className, children, open, parentRef, offsetTop, offsetLeft } = props;
    const [coordinates, setCoordinates] = useState({ left: 0, top: 0 });
    const { screen } = useScreen();

    const setPopupPosition = useCallback(() => {
        if (parentRef?.current) {
            const { left, top, height } = parentRef?.current.getBoundingClientRect();
            setCoordinates({ left: left + offsetLeft, top: top + height + offsetTop });
        }
    }, [parentRef, offsetLeft, offsetTop]);

    useEffect(() => {
        if (open) {
            setPopupPosition();
        }
    }, [screen.width, screen.height, open, setPopupPosition]);

    if (!open || !parentRef?.current) return null;

    return createPortal(
        <div
            ref={ref}
            className={classNames(styles.optionsPopup, className)}
            style={{ left: coordinates.left, top: coordinates.top }}
        >
            {children}
        </div>,
        document.body,
    );
});

OptionsPopup.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
    parentRef: PropTypes.shape({
        current: PropTypes.shape({
            getBoundingClientRect: PropTypes.func,
        }),
    }),
    offsetTop: PropTypes.number,
    offsetLeft: PropTypes.number,
};

OptionsPopup.defaultProps = {
    className: '',
    open: false,
    offsetTop: 0,
    offsetLeft: 0,
    parentRef: null,
};

export default OptionsPopup;
