/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Item } from 'pages/Contacts/Info/components';

import styles from './styles.module.scss';

const Positions = (props) => {
    const { className, positions } = props;
    const { translate } = useTranslate();

    if (!positions || !positions.length) return null;

    return (
        <div className={classNames(styles.positions, className)}>
            <Item
                label={translate.Position}
                value={positions.map(({ label }) => label).join(', ')}
            />
        </div>
    );
};

Positions.propTypes = {
    className: PropTypes.string,
    positions: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        number: PropTypes.number,
    })).isRequired,
};

Positions.defaultProps = {
    className: '',
};

export default Positions;
