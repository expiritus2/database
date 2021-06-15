import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useSelector } from 'react-redux';
import { getUserSelector } from 'store/selectors/auth';

import styles from './styles.module.scss';

const SimpleModal = (props) => {
    const { isOpen, children, className, opacityLayerClassName, testid } = props;
    const { contentClassName, innerHolderClassName, onClose, scroll } = props;
    const user = useSelector(getUserSelector);

    if (!user.data) return null;

    return createPortal(
        <div testid={testid} className={classNames(styles.modal, { [styles.isOpen]: isOpen }, className)}>
            <div onClick={onClose} className={classNames(styles.opacityLayer, opacityLayerClassName)} />
            <div className={classNames(styles.contentWrapper)}>
                <div className={classNames(styles.content, contentClassName)}>
                    <div className={classNames(styles.innerHolder, { [styles.scroll]: scroll }, innerHolderClassName)}>
                        {isOpen && children}
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};

SimpleModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    opacityLayerClassName: PropTypes.string,
    header: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onClose: PropTypes.func,
    testid: PropTypes.string,
    scroll: PropTypes.bool,
};

SimpleModal.defaultProps = {
    className: '',
    contentClassName: '',
    opacityLayerClassName: '',
    onClose: () => {},
    testid: undefined,
    scroll: false,
};

export default SimpleModal;
