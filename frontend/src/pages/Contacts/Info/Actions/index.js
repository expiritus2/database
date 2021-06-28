import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { getCurrentContactSelector } from 'store/selectors/contact';
import { setInitContactFormDataEffect } from 'store/effects/forms/contact';
import { useSelector, useDispatch } from 'react-redux';
import { useOutsideClick, useTranslate } from 'hooks';
import { OptionsPopup, PaddingWrapper } from 'components';
import { FiSettings } from 'react-icons/fi';
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
    const settingsRef = useRef();
    const popupRef = useRef();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useOutsideClick([settingsRef, popupRef], () => setSettingsOpen(false));

    const onSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    const onEdit = () => {
        dispatch(setInitContactFormDataEffect(contact));
        dispatch(openModalEffect({ modalId: location.pathname, open: true, mode: EDIT }));
    };

    const onDelete = () => {
        dispatch(deleteContactEffect({ id: contact.id }));
        dispatch(resetContactEffect());
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
