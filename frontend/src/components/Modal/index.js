import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Close from './Close';

const Modal = (props) => {
    const { isOpen, children, className, opacityLayerClassName, testid } = props;
    const { contentClassName, innerHolderClassName, onClose } = props;

    return createPortal(
        <div testid={testid} className={classNames(styles.modal, { [styles.isOpen]: isOpen }, className)}>
            <div onClick={onClose} className={classNames(styles.opacityLayer, opacityLayerClassName)} />
            <div className={classNames(styles.contentWrapper)}>
                <div className={classNames(styles.content, contentClassName)}>
                    <Close onClose={onClose} />
                    <div className={classNames(styles.innerHolder, innerHolderClassName)}>
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    opacityLayerClassName: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onClose: PropTypes.func,
    testid: PropTypes.string,
};

Modal.defaultProps = {
    className: '',
    contentClassName: '',
    opacityLayerClassName: '',
    onClose: () => {},
    testid: undefined,
};

export default Modal;
