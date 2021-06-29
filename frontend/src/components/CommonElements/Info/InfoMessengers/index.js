/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { InfoItem } from 'components';

import styles from './styles.module.scss';

const InfoMessengers = (props) => {
    const { className, list } = props;

    if (!list || !list.length) return null;

    const getValue = (messenger) => {
        switch (messenger?.messengerType?.value) {
            case 'skype': {
                return <a href={`skype:${messenger?.accountName}?chat`}>{messenger?.accountName}</a>;
            }
            case 'telegram': {
                return <a target="_blank" rel="noreferrer" href={`https://telegram.me/${messenger?.accountName}`}>{messenger?.accountName}</a>;
            }
            default: {
                return messenger?.accountName;
            }
        }
    };

    return (
        <div className={classNames(styles.infoMessengers, className)}>
            {list.map((messenger) => {
                if (!messenger?.messengerType) return null;

                return (
                    <InfoItem
                        key={messenger?.id}
                        label={messenger?.messengerType?.label}
                        value={getValue(messenger)}
                    />
                );
            })}
        </div>
    );
};

InfoMessengers.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        messengerType: PropTypes.shape({
            label: PropTypes.string,
        }),
        accountName: PropTypes.string,
    })),
};

InfoMessengers.defaultProps = {
    className: '',
    list: undefined,
};

export default InfoMessengers;
