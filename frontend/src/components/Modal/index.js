import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '@material-ui/core/Modal';

import styles from './styles.module.scss';

const ModalComponent = (props) => {
    const { className, children, open, onClose, title, closeAfterTransition } = props;

    return (
        <Modal
            aria-labelledby={title}
            className={classNames(styles.modal, className)}
            open={open}
            onClose={onClose}
            closeAfterTransition={closeAfterTransition}
        >
            {children}
        </Modal>
    );
};

ModalComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    title: PropTypes.string,
    closeAfterTransition: PropTypes.bool,
};

ModalComponent.defaultProps = {
    className: '',
    onClose: PropTypes.func,
    title: '',
    closeAfterTransition: true,
};

export default ModalComponent;
