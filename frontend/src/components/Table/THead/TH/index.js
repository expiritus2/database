import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles.module.scss';

const TH = ({ column, filter }) => (
    <th style={{ width: column.width }}>
        <div>{column.title}</div>
        {filter && typeof filter === 'function' && (
            <div className={styles.filter}>
                {filter(column)}
            </div>
        )}
    </th>
);

TH.propTypes = {
    column: PropTypes.shape({
        title: PropTypes.string,
        width: PropTypes.string,
    }).isRequired,
    filter: PropTypes.func,
};

TH.defaultProps = {
    filter: null,
};

export default memo(TH);
