import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './styles.module.scss';

const Skills = (props) => {
    const { skills, className } = props;
    const { translate } = useTranslate();

    return (
        <Typography component="div" className={classNames(styles.skills, className)}>
            <Box fontWeight="fontWeightBold">
                {`${translate.Skills}: `}
            </Box>
            <Box className={styles.values}>
                {skills.join(', ')}
            </Box>
        </Typography>
    );
};

Skills.propTypes = {
    className: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Skills.defaultProps = {
    className: '',
};

export default Skills;
