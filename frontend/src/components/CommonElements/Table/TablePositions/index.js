import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const TablePositions = (props) => {
    const { list, className } = props;

    if (!list) return null;

    return (
        <div className={classNames(styles.positions, className)}>
            {list.map((item) => item?.label).join(', ')}
        </div>
    );
};

TablePositions.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

TablePositions.defaultProps = {
    className: '',
};

export default TablePositions;
