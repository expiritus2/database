import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Item } from 'pages/Vacancies/Info/components';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import styles from './styles.module.scss';

const Active = (props) => {
    const { className, value } = props;
    const { translate } = useTranslate();

    const getValue = () => {
        if (value) {
            return translate.SheActive;
        }

        return translate.SheNotActive;
    };

    return (
        <div className={classNames(styles.active, className)}>
            <Item
                label=""
                value={(
                    <Typography component="div">
                        <Box fontWeight="fontWeightBold">{getValue()}</Box>
                    </Typography>
                )}
            />
        </div>
    );
};

Active.propTypes = {
    className: PropTypes.string,
    value: PropTypes.bool.isRequired,
};

Active.defaultProps = {
    className: '',
};

export default Active;
