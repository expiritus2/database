import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getUserSelector } from 'store/selectors/auth';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { SimpleModal } from 'components';

import styles from './styles.module.scss';

const ModalComponent = (props) => {
    const { className, children, open, onClose, closeAfterTransition, title } = props;
    const { cardClassName, cardContentClassName, cardActionsClassName } = props;
    const { actionsChildren } = props;
    const user = useSelector(getUserSelector);

    if (!user.data) return null;

    return (
        <SimpleModal
            className={classNames(styles.modal, className)}
            isOpen={open}
            onClose={onClose}
            closeAfterTransition={closeAfterTransition}
        >
            <div className={classNames(styles.card, cardClassName)}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <AiOutlineCloseCircle onClick={onClose} className={styles.closeIcon} />
                </div>
                <div className={classNames(styles.cardContent, cardContentClassName)}>
                    {children}
                </div>
                {actionsChildren && (
                    <div className={classNames(styles.actions, cardActionsClassName)}>
                        {actionsChildren}
                    </div>
                )}
            </div>
        </SimpleModal>
    );
};

ModalComponent.propTypes = {
    className: PropTypes.string,
    cardClassName: PropTypes.string,
    cardContentClassName: PropTypes.string,
    cardActionsClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    closeAfterTransition: PropTypes.bool,
    actionsChildren: PropTypes.node,
    title: PropTypes.string,
};

ModalComponent.defaultProps = {
    className: '',
    cardClassName: '',
    cardActionsClassName: '',
    cardContentClassName: '',
    onClose: PropTypes.func,
    closeAfterTransition: true,
    actionsChildren: undefined,
    title: '',
};

export default ModalComponent;
