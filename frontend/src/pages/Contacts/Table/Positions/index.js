import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Positions = (props) => {
    const { positions, className } = props;

    if (!positions || !positions?.length) return null;

    return (
        <div className={classNames(styles.positions, className)}>
            {positions.map((position) => position?.label).join(', ')}
        </div>
    );
};

Positions.propTypes = {
    className: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Positions.defaultProps = {
    className: '',
};

export default Positions;
