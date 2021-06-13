/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Recruiters = (props) => {
    const { className, value } = props;
    const { translate } = useTranslate();

    if (!value || !value.length) return null;

    return (
        <div className={classNames(styles.value, className)}>
            {value.map(({ id, email }) => (
                <InfoItem
                    key={id}
                    label={translate.Recruiters}
                    value={email}
                />
            ))}
        </div>
    );
};

Recruiters.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string,
        value: PropTypes.string,
    })),
};

Recruiters.defaultProps = {
    className: '',
    value: undefined,
};

export default Recruiters;
