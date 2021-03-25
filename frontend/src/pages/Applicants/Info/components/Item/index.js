import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './styles.module.scss';

const Item = (props) => {
    const { label, value, className } = props;

    return (
        <div className={classNames(styles.item, className)}>
            <Typography component="div" className={styles.label}>
                <Box component="span" fontWeight="fontWeightBold">{`${label}:`}</Box>
            </Typography>
            <Typography component="div" className={styles.value}>{value}</Typography>
        </div>
    );
};

Item.propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Item.defaultProps = {
    className: '',
    label: '',
    value: '',
};

export default Item;
