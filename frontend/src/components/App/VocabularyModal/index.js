import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SimpleModal } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { modalsIds } from 'settings/constants/modals';
import { openModalEffect } from 'store/effects/app';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';

import styles from './styles.module.scss';

const VocabularyModal = (props) => {
    const { className } = props;
    const dispatch = useDispatch();

    const modal = useSelector(getModalStateSelector);

    const onClose = () => {
        dispatch(openModalEffect({ open: false }));
    };

    return (
        <div className={classNames(styles.vocabularyModal, className)}>
            <SimpleModal
                onClose={onClose}
                isOpen={modal.id === modalsIds.VOCABULARIES && modal.open}
            >
                <ModalHeader onClose={onClose} />
                <ModalContent />
            </SimpleModal>
        </div>
    );
};

VocabularyModal.propTypes = {
    className: PropTypes.string,
};

VocabularyModal.defaultProps = {
    className: '',
};

export default VocabularyModal;
