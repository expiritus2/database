/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Activities = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    const getValue = () => (
        <div className={styles.languageValue}>
            {list.map(({ id, label }) => (
                <div key={id}>{label}</div>
            ))}
        </div>
    );

    return (
        <div className={classNames(styles.languages, className)}>
            <InfoItem label={translate.Activities} value={getValue()} />
        </div>
    );
};

Activities.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
    })),
};

Activities.defaultProps = {
    className: '',
    list: [],
};

export default Activities;
