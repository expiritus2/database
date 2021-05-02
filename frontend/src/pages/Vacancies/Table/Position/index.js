import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import styles from './styles.module.scss';

const Position = (props) => {
    const { position, className } = props;

    return (
        <Typography variant="h5" className={classNames(styles.position, className)}>
            {position}
        </Typography>
    );
};

Position.propTypes = {
    className: PropTypes.string,
    position: PropTypes.string.isRequired,
};

Position.defaultProps = {
    className: '',
};

export default Position;
