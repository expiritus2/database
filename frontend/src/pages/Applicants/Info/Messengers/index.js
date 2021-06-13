/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InfoItem } from 'components';

import styles from './styles.module.scss';

const Messengers = (props) => {
    const { className, list } = props;

    if (!list || !list.length) return null;

    return (
        <div className={classNames(styles.list, className)}>
            {list.map((messenger, index) => {
                if (!messenger?.messengerType) return null;

                return (
                    <InfoItem
                        key={messenger?.id || index}
                        label={messenger?.messengerType?.label}
                        value={messenger?.accountName}
                    />
                );
            })}
        </div>
    );
};

Messengers.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        messengerType: PropTypes.shape({
            label: PropTypes.string,
        }),
        accountName: PropTypes.string,
    })),
};

Messengers.defaultProps = {
    className: '',
    list: undefined,
};

export default Messengers;
