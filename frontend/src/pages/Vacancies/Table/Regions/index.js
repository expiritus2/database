import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './styles.module.scss';

const Regions = (props) => {
    const { regions, className } = props;
    const { translate } = useTranslate();

    return (
        <Typography component="div" className={classNames(styles.skills, className)}>
            <Box fontWeight="fontWeightBold">
                {`${translate.Regions}: `}
            </Box>
            <Box className={styles.values}>
                {regions.join(', ')}
            </Box>
        </Typography>
    );
};

Regions.propTypes = {
    className: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Regions.defaultProps = {
    className: '',
};

export default Regions;
