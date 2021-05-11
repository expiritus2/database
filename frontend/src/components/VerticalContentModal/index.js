import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

import styles from './styles.module.scss';

const ModalComponent = (props) => {
    const { className, children, open, onClose, closeAfterTransition } = props;
    const { cardClassName } = props;

    return (
        <Modal
            className={classNames(styles.modal, className)}
            open={open}
            onClose={onClose}
            closeAfterTransition={closeAfterTransition}
        >
            <Card className={classNames(styles.card, cardClassName)}>
                {children}
            </Card>
        </Modal>
    );
};

ModalComponent.propTypes = {
    className: PropTypes.string,
    cardClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    closeAfterTransition: PropTypes.bool,
};

ModalComponent.defaultProps = {
    className: '',
    cardClassName: '',
    onClose: PropTypes.func,
    closeAfterTransition: true,
};

export default ModalComponent;
