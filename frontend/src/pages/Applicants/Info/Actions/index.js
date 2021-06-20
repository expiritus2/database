import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { setApplicantFormDataEffect } from 'store/effects/forms/applicant';
import { useSelector, useDispatch } from 'react-redux';
import { useOutsideClick, useTranslate } from 'hooks';
import { OptionsPopup } from 'components';
import { FiSettings } from 'react-icons/fi';
import { GrEdit } from 'react-icons/gr';
import { EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { deleteApplicantEffect, resetApplicantEffect } from 'store/effects/applicants';
import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Actions = (props) => {
    const { className } = props;
    const currentApplicantInfo = useSelector(getCurrentApplicantSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    const { translate } = useTranslate();
    const settingsRef = useRef();
    const popupRef = useRef();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useOutsideClick([settingsRef, popupRef], () => setSettingsOpen(false));

    const onSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    const onEdit = () => {
        dispatch(setApplicantFormDataEffect(currentApplicantInfo));
        dispatch(openModalEffect({ modalId: location.pathname, open: true, mode: EDIT }));
    };

    const onDelete = () => {
        dispatch(deleteApplicantEffect({ id: currentApplicantInfo.id }));
        dispatch(resetApplicantEffect());
    };

    return (
        <PaddingWrapper className={classNames(styles.actions, className)}>
            <span ref={settingsRef}>
                <FiSettings onClick={onSettings} className={styles.settings} />
            </span>
            <OptionsPopup className={styles.optionsPopup} ref={popupRef} open={settingsOpen} parentRef={settingsRef}>
                <ul className={styles.actionsList}>
                    <li>{translate.AddEvent}</li>
                    <li>{translate.PrintCard}</li>
                    <li>{translate.CopyCard}</li>
                    <li>{translate.History}</li>
                    <li onClick={onDelete}>{translate.Delete}</li>
                </ul>
            </OptionsPopup>
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
