/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoPositions = (props) => {
    const { className, positions } = props;
    const { translate } = useTranslate();

    if (!positions || !positions.length) return null;

    const getValue = () => (
        positions.map((position) => (
            <div key={position?.id}>{position?.label}</div>
        ))
    );

    return (
        <div className={classNames(styles.infoPositions, className)}>
            <InfoItem
                label={translate.Position}
                value={getValue()}
            />
        </div>
    );
};

InfoPositions.propTypes = {
    className: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })),
};

InfoPositions.defaultProps = {
    className: '',
    positions: [],
};

export default InfoPositions;
