/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Regions = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    return (
        <div className={classNames(styles.list, className)}>
            <InfoItem
                label={translate.Regions}
                value={list.map(({ label }) => label).join(', ')}
            />
        </div>
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })),
};

Regions.defaultProps = {
    className: '',
    list: [],
};

export default Regions;
