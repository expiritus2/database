import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DefaultHeader from './Header';

import styles from './styles.module.scss';

const Drawer = (props) => {
    const { isOpen, children, className, position, onClose, header } = props;

    return createPortal(
        <div className={classNames(styles.drawer, { [styles.isOpen]: isOpen }, className)}>
            <div onClick={onClose} className={classNames(styles.opacityLayer)} />
            <div className={classNames(styles.content, styles[position])}>
                {header || <DefaultHeader onClose={onClose} />}
                {children}
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
    position: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    refs: PropTypes.arrayOf(PropTypes.any),
    onClose: PropTypes.func,
};

Drawer.defaultProps = {
    className: '',
    position: Drawer.RIGHT,
    refs: [],
    onClose: () => {},
};

export default Drawer;
