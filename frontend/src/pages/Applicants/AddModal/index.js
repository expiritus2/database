import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router-dom';

import { Modal } from 'components';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';

import styles from './styles.module.scss';

const AddModal = ({ className }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const modal = useSelector(getModalStateSelector);

    const handleClose = () => {
        dispatch(openModalEffect({ modalId: modal.id, open: false }));
    };

    return (
        <Modal className={className} open={location.pathname === modal.id && modal.open} onClose={handleClose}>
            <Paper className={styles.paper}>
                <h2 id="transition-modal-title">Transition modal</h2>
                <p id="transition-modal-description">react-transition-group animates me.</p>
            </Paper>
        </Modal>
    );
};

AddModal.propTypes = {
    className: PropTypes.string,
};

AddModal.defaultProps = {
    className: '',
};

export default AddModal;
