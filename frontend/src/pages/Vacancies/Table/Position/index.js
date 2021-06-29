import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { NameText } from 'components';
import styles from './styles.module.scss';

const Position = (props) => {
    const { label, className } = props;

    if (!label) return null;

    return (
        <div className={classNames(styles.position, className)}>
            <NameText>{label}</NameText>
        </div>
    );
};

Position.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
};

Position.defaultProps = {
    className: '',
};

export default Position;
