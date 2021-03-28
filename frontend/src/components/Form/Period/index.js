import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { DatePicker } from 'components/index';

import styles from './styles.module.scss';

const Period = (props) => {
    const { className, onChange, name, value } = props;
    const { translate } = useTranslate();

    const onChangeHandler = (e, val) => {
        onChange(e, val);
    };

    return (
        <div className={classNames(styles.wrapper, className)}>
            <DatePicker
                name={name}
                label={translate.Period}
                onChange={onChangeHandler}
                value={value?.length ? value : undefined}
                options={{
                    mode: 'range',
                }}
            />
        </div>
    );
};

Period.propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.string),
    ]),
    onChange: PropTypes.func,
    name: PropTypes.string,
};

Period.defaultProps = {
    className: '',
    value: [],
    onChange: () => {},
    name: undefined,
};

export default Period;
