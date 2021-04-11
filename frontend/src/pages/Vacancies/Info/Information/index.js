import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';

import { useTranslate } from 'hooks';
import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Information = (props) => {
    const { value, className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.information, className)}>
            <PaddingWrapper>
                <Typography className={styles.title}>{translate.Info}</Typography>
                <Typography variant="body1">{value}</Typography>
            </PaddingWrapper>
        </div>
    );
};

Information.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
};

Information.defaultProps = {
    className: '',
    value: '',
};

export default Information;
