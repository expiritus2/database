/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Item } from 'pages/Vacancies/Info/components';

import styles from './styles.module.scss';

const Position = (props) => {
    const { className, position } = props;

    if (!position) return null;

    return (
        <div className={classNames(styles.position, className)}>
            <Item
                label=""
                value={<h5>{position?.label}</h5>}
            />
        </div>
    );
};

Position.propTypes = {
    className: PropTypes.string,
    position: PropTypes.shape({
        label: PropTypes.string,
    }).isRequired,
};

Position.defaultProps = {
    className: '',
};

export default Position;
