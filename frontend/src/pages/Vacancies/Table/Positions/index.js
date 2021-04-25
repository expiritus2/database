import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import styles from './styles.module.scss';

const Positions = (props) => {
    const { positions, className } = props;

    return (
        <Typography variant="h5" className={classNames(styles.positions, className)}>
            {positions.join(', ')}
        </Typography>
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
