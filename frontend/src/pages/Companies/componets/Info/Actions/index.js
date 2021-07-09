import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { getCurrentCompanySelector } from 'store/selectors/company';
import { setInitCompanyFormDataEffect } from 'store/effects/forms/company';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslate } from 'hooks';
import { PaddingWrapper, InfoActions } from 'components';
import { GrEdit } from 'react-icons/gr';
import { EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { deleteCompanyEffect, resetCompanyEffect } from 'store/effects/companies';

import styles from './styles.module.scss';

const Actions = (props) => {
    const { className } = props;
    const { company } = useSelector(getCurrentCompanySelector);
    const dispatch = useDispatch();
    const location = useLocation();
    const { translate } = useTranslate();

    const onEdit = () => {
        dispatch(setInitCompanyFormDataEffect(company));
        dispatch(openModalEffect({ modalId: location.pathname, open: true, mode: EDIT }));
    };

    const onDelete = useCallback(() => {
        dispatch(deleteCompanyEffect({ id: company?.id }));
        dispatch(resetCompanyEffect());
    }, [dispatch, company?.id]);

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
