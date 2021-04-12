import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './styles.module.scss';

const Positions = (props) => {
    const { positions, className } = props;

    return (
        <Typography component="div" className={classNames(styles.positions, className)}>
            <Box fontStyle="italic">
                {positions.join(', ')}
            </Box>
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
