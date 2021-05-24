import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'components/Form-NEW';
import { useTranslate } from 'hooks';

import { getVocabularyEducationsSelector } from 'store/selectors/vocabulary';

import { getVocabularyEducationsEffect } from 'store/effects/vocabulary';
import styles from './styles.module.scss';

const Education = (props) => {
    const { className, onChange, value, name } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const { educations } = useSelector(getVocabularyEducationsSelector);

    useEffect(() => {
        dispatch(getVocabularyEducationsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.education, className)}>
            <Select
                name={name}
                variant={Select.LIGHT_FULL}
                label={translate.Education}
                options={educations}
                value={value?.trim()}
                onChange={onChange}
            />
        </div>
    );
};

Education.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
};

Education.defaultProps = {
    className: '',
    onChange: () => {},
    value: undefined,
    name: undefined,
};

export default Education;
