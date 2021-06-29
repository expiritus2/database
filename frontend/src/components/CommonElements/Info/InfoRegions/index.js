/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoRegions = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    return (
        <div className={classNames(styles.infoRegions, className)}>
            <InfoItem
                label={translate.Regions}
                value={list.map(({ label }) => label).join(', ')}
            />
        </div>
    );
};

InfoRegions.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })),
};

InfoRegions.defaultProps = {
    className: '',
    list: [],
};

export default InfoRegions;
