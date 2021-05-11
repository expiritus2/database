import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const Positions = (props) => {
    const { positions, className } = props;

    return (
        <div className={classNames(styles.positions, className)}>
            {positions.join(', ')}
        </div>
    );
};

Positions.propTypes = {
    className: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Positions.defaultProps = {
    className: '',
};

export default Positions;
