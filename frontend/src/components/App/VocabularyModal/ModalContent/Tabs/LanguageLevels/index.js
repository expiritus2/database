import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.module.scss';

const LanguageLevels = (props) => {
    const { className } = props;

    return (
        <div className={classNames(styles.languageLevels, className)}>
            LanguageLevels
        </div>
    );
};

LanguageLevels.propTypes = {
    className: PropTypes.string,
};

LanguageLevels.defaultProps = {
    className: '',
};

export default LanguageLevels;
