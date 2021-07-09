import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { getCurrentContactSelector } from 'store/selectors/contact';
import { setInitContactFormDataEffect } from 'store/effects/forms/contact';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslate } from 'hooks';
import { PaddingWrapper, InfoActions } from 'components';
import { GrEdit } from 'react-icons/gr';
import { EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { deleteContactEffect, resetContactEffect } from 'store/effects/contacts';

import styles from './styles.module.scss';

const Actions = (props) => {
    const { className } = props;
    const { contact } = useSelector(getCurrentContactSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    const { translate } = useTranslate();

    const onEdit = () => {
        dispatch(setInitContactFormDataEffect(contact));
        dispatch(openModalEffect({ modalId: location.pathname, open: true, mode: EDIT }));
    };

    const onDelete = useCallback(() => {
        dispatch(deleteContactEffect({ id: contact?.id }));
        dispatch(resetContactEffect());
    }, [dispatch, contact?.id]);

    const options = useMemo(() => [
        { label: translate.AddEvent, onClick: () => {} },
        { label: translate.PrintCard, onClick: () => {} },
        { label: translate.CopyCard, onClick: () => {} },
        { label: translate.History, onClick: () => {} },
        { label: translate.Delete, onClick: onDelete },
    ], [onDelete, translate]);

    return (
        <PaddingWrapper className={classNames(styles.actions, className)}>
            <InfoActions options={options} />
            <GrEdit onClick={onEdit} className={styles.edit} />
        </PaddingWrapper>
    );
};

Actions.propTypes = {
    className: PropTypes.string,
};

Actions.defaultProps = {
    className: '',
};

export default Actions;
