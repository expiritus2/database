import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { getCurrentVacancySelector } from 'store/selectors/vacancy';
import { setInitVacancyFormDataEffect } from 'store/effects/forms/vacancy';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslate } from 'hooks';
import { PaddingWrapper, InfoActions } from 'components';
import { GrEdit } from 'react-icons/gr';
import { EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { deleteVacancyEffect, resetVacancyEffect } from 'store/effects/vacancies';

import styles from './styles.module.scss';

const Actions = (props) => {
    const { className } = props;
    const { vacancy } = useSelector(getCurrentVacancySelector);
    const dispatch = useDispatch();
    const location = useLocation();
    const { translate } = useTranslate();

    const onEdit = () => {
        dispatch(setInitVacancyFormDataEffect(vacancy));
        dispatch(openModalEffect({ modalId: location.pathname, open: true, mode: EDIT }));
    };

    const onDelete = useCallback(() => {
        dispatch(deleteVacancyEffect({ id: vacancy?.id }));
        dispatch(resetVacancyEffect());
    }, [dispatch, vacancy?.id]);

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
