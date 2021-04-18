/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { messengersOptions } from 'settings/constants/messengers';
import { useTranslate } from 'hooks';
import { Item } from 'pages/Applicants/Info/components';

import styles from './styles.module.scss';

const Messengers = (props) => {
    const { className, list } = props;
    const { translate } = useTranslate();

    if (!list || !list.length) return null;

    const getItem = (val) => messengersOptions(translate).find((option) => option?.value === val);

    return (
        <div className={classNames(styles.list, className)}>
            {list.map((item, index) => (
                <Item
                    key={index}
                    label={getItem(item?.messenger)?.label}
                    value={item?.accountName}
                />
            ))}
        </div>
    );
};

Messengers.propTypes = {
    className: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
        messenger: PropTypes.string,
        accountName: PropTypes.string,
    })),
};

Messengers.defaultProps = {
    className: '',
    list: undefined,
};

export default Messengers;
