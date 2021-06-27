import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyWorkTypesEffect } from 'store/effects/vocabulary';
import { getVocabularyWorkTypesSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import styles from './styles.module.scss';

const WorkTypes = (props) => {
    const { className, onChange, value } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { workTypes } = useSelector(getVocabularyWorkTypesSelector);

    useEffect(() => {
        dispatch(getVocabularyWorkTypesEffect());
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.workType, className)}>
            <Select
                multiple
                search
                label={translate.WorkTypes}
                onChange={onChange}
                value={value}
                options={workTypes}
            />
        </div>
    );
};

WorkTypes.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

WorkTypes.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default WorkTypes;
