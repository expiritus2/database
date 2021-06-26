import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Active = (props) => {
    const { className, value } = props;
    const { translate } = useTranslate();

    const getValue = () => {
        if (value) {
            return translate.SheActive;
        }

        return translate.SheNotActive;
    };

    return (
        <div className={classNames(styles.active, className)}>
            <InfoItem
                label=""
                value={<div className={styles.text}>{getValue()}</div>}
            />
        </div>
    );
};

Active.propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool,
};

Active.defaultProps = {
    className: '',
    value: undefined,
};

export default Active;
