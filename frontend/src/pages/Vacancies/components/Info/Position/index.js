/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InfoItem, NameText } from 'components';

import styles from './styles.module.scss';

const Position = (props) => {
    const { className, position } = props;

    if (!position) return null;

    return (
        <div className={classNames(styles.position, className)}>
            <InfoItem
                label=""
                value={<NameText className={styles.positionName}>{position?.label}</NameText>}
            />
        </div>
    );
};

Position.propTypes = {
    className: PropTypes.string,
    position: PropTypes.shape({
        label: PropTypes.string,
    }),
};

Position.defaultProps = {
    className: '',
    position: {},
};

export default Position;
