import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { capitalize } from 'lodash-es';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Avatar } from 'components';

import { useTranslate } from 'hooks';
import styles from './styles.module.scss';

const Name = (props) => {
    const { name, photos, sex, active, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.name, className)}>
            <Avatar src={photos?.[0]} />
            <div className={styles.texts}>
                <Typography variant="h5">{name}</Typography>
                <Typography variant="body1">
                    <Box component="span" fontWeight="fontWeightBold">
                        {active ? translate.Actives : translate.NotActives}
                    </Box>
                </Typography>
                <Typography variant="body1">
                    <Box component="span" fontStyle="italic">
                        {translate[capitalize(sex)]}
                    </Box>
                </Typography>
            </div>
        </div>
    );
};

Name.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    sex: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    active: PropTypes.bool,
};

Name.defaultProps = {
    className: '',
    name: '',
    sex: '',
    photos: [],
    active: false,
};

export default Name;
