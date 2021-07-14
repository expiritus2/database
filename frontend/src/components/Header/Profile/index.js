import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate, useOutsideClick } from 'hooks';
import { Button } from 'components/Form';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfoSelector } from 'store/selectors/auth';
import { logoutEffect } from 'store/effects/auth';

import ProfileModal from '../ProfileModal';
import InviteModal from '../InviteModal';

import styles from './styles.module.scss';

const Profile = (props) => {
    const { className, navButtonClassName } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { displayName, isSuperAdmin } = useSelector(getUserInfoSelector);
    const [openOptions, setOpenOptions] = useState(false);
    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openInviteModal, setOpenInviteModal] = useState(false);
    const buttonRef = useRef();
    const optionsRef = useRef();

    useOutsideClick([buttonRef, optionsRef], () => setOpenOptions(false));

    const onOpenOptions = () => {
        setOpenOptions(!openOptions);
    };

    const onClickProfile = () => {
        setOpenProfileModal(true);
        setOpenOptions(false);
    };

    const onClickInvite = () => {
        setOpenInviteModal(true);
        setOpenOptions(false);
    };

    const onClickLogout = () => {
        dispatch(logoutEffect());
    };

    return (
        <div className={classNames(styles.profile, className)}>
            <Button
                className={classNames(styles.profileButton, styles.navElement, navButtonClassName)}
                title={displayName}
                onClick={onOpenOptions}
                ref={buttonRef}
            />
            {openOptions && (
                <div ref={optionsRef} className={styles.options}>
                    <ul>
                        <li onClick={onClickProfile} className={styles.item}>{translate.Profile}</li>
                        {isSuperAdmin && <li onClick={onClickInvite} className={styles.item}>{translate.Invite}</li>}
                        <li onClick={onClickLogout} className={styles.item}>{translate.Logout}</li>
                    </ul>
                </div>
            )}
            <ProfileModal isOpen={openProfileModal} setIsOpen={setOpenProfileModal} />
            <InviteModal isOpen={openInviteModal} setIsOpen={setOpenInviteModal} />
        </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string,
    navButtonClassName: PropTypes.string,
};

Profile.defaultProps = {
    className: '',
    navButtonClassName: '',
};

export default Profile;
