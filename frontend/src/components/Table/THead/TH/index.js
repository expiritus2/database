import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles.module.scss';

const TH = ({ column, filter, className }) => (
    <th style={{ width: column.width }} className={className}>
        <div>{column.title}</div>
        {filter && typeof filter === 'function' && (
            <div className={styles.filter}>
                {filter(column)}
            </div>
        )}
    </th>
);

TH.propTypes = {
    className: PropTypes.string,
    column: PropTypes.shape({
        title: PropTypes.string,
        width: PropTypes.string,
    }).isRequired,
    filter: PropTypes.func,
};

TH.defaultProps = {
    className: undefined,
    filter: null,
};

export default memo(TH);
