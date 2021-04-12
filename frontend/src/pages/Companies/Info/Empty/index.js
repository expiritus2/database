import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const Empty = (props) => {
    const { className } = props;
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.empty, className)}>
            <div>{translate.EmptyContact}</div>
        </div>
    );
};

Empty.propTypes = {
    className: PropTypes.string,
};

Empty.defaultProps = {
    className: '',
};

export default Empty;
