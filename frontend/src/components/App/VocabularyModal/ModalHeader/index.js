import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const ModalHeader = (props) => {
    const { className, onClose } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.modalHeader, className)}>
            <h3>{translate.VocabularySettings}</h3>
            <div>
                <AiOutlineCloseCircle onClick={onClose} className={styles.close} />
            </div>
        </div>
    );
};

ModalHeader.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
};

ModalHeader.defaultProps = {
    className: '',
    onClose: () => {},
};

export default ModalHeader;
