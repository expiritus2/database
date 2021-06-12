import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularySexsSelector } from 'store/selectors/vocabulary';
import { getVocabularySexsEffect } from 'store/effects/vocabulary';
import styles from './styles.module.scss';

const Sex = (props) => {
    const { className, name, onChange, label, value } = props;
    const dispatch = useDispatch();
    const { sexs, isIdle } = useSelector(getVocabularySexsSelector);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularySexsEffect({}, { silent: true }));
        }
    });

    return (
        <div className={classNames(styles.sexs, className)}>
            <Select
                name={name}
                label={label}
                onChange={onChange}
                options={sexs}
                value={value}
            />
        </div>
    );
};

Sex.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

Sex.defaultProps = {
    className: '',
    name: '',
    label: '',
    value: '',
    onChange: () => {},
};

export default Sex;
