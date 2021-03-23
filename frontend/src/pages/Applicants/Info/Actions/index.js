import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useOutsideClick } from 'hooks';
import { OptionsPopup } from 'components';
import { FiSettings } from 'react-icons/fi';
import { GrEdit } from 'react-icons/gr';
import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Actions = (props) => {
    const { className } = props;
    const settingsRef = useRef();
    const popupRef = useRef();
    const [settingsOpen, setSettingsOpen] = useState(false);

    useOutsideClick([settingsRef, popupRef], () => setSettingsOpen(false));

    const onSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    return (
        <PaddingWrapper className={classNames(styles.actions, className)}>
            <span ref={settingsRef}>
                <FiSettings onClick={onSettings} className={styles.settings} />
            </span>
            <OptionsPopup ref={popupRef} open={settingsOpen} parentRef={settingsRef}>
                <div>Test</div>
            </OptionsPopup>
            <GrEdit className={styles.edit} />
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
