/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useOutsideClick } from 'hooks';
import { OptionsPopup } from 'components';
import { FiSettings } from 'react-icons/fi';

import styles from './styles.module.scss';

const InfoActions = (props) => {
    const { className, options } = props;
    const settingsRef = useRef();
    const popupRef = useRef();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useOutsideClick([settingsRef, popupRef], () => setSettingsOpen(false));

    const onSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    return (
        <div className={classNames(styles.actions, className)}>
            <span ref={settingsRef}>
                <FiSettings onClick={onSettings} className={styles.settings} />
            </span>
            <OptionsPopup ref={popupRef} open={settingsOpen} parentRef={settingsRef}>
                <ul className={styles.actionsList}>
                    {options.map((option, index) => (
                        <li key={index} onClick={option?.onClick}>{option?.label}</li>
                    ))}
                </ul>
            </OptionsPopup>
        </div>
    );
};

InfoActions.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    })).isRequired,
};

InfoActions.defaultProps = {
    className: '',
};

export default InfoActions;
