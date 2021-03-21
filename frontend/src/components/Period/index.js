import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { useTranslate } from 'hooks';
import { DatePicker } from 'components';

import styles from './styles.module.scss';

const Period = (props) => {
    const { className, defaultDate, onChange, name } = props;
    const { translate } = useTranslate();

    const onChangeHandler = (e, val) => {
        const [from, to] = val;
        const fromTimestamp = moment(from).valueOf();
        const toTimestamp = moment(to).valueOf();
        onChange(e, val, [fromTimestamp, toTimestamp]);
    };

    return (
        <div className={classNames(styles.wrapper, className)}>
            <DatePicker
                name={name}
                label={translate.Period}
                onChange={onChangeHandler}
                options={{
                    defaultDate: defaultDate?.length ? defaultDate : undefined,
                    mode: 'range',
                }}
            />
        </div>
    );
};

Period.propTypes = {
    className: PropTypes.string,
    defaultDate: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        PropTypes.arrayOf(PropTypes.number),
    ]),
    onChange: PropTypes.func,
    name: PropTypes.string,
};

Period.defaultProps = {
    className: '',
    defaultDate: [],
    onChange: () => {},
    name: undefined,
};

export default Period;
