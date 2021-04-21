import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularyCompaniesEffect } from 'store/effects/resources';
import { getResourcesCompaniesSelector } from 'store/selectors/resources';
import { Autocomplete } from 'components';
import { useTranslate } from 'hooks';

import styles from './styles.module.scss';

const Company = (props) => {
    const { className, onChange, value, name } = props;
    const dispatch = useDispatch();
    const companies = useSelector(getResourcesCompaniesSelector);

    useEffect(() => {
        dispatch(getVocabularyCompaniesEffect({}, { silent: true }));
    }, []); // eslint-disable-line
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.education, className)}>
            <Autocomplete
                name={name}
                label={translate.Company}
                options={companies}
                defaultValue={value?.value || ''}
                onChange={onChange}
            />
        </div>
    );
};

Company.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.shape({
        value: PropTypes.string,
    }),
    name: PropTypes.string,
};

Company.defaultProps = {
    className: '',
    onChange: () => {},
    value: {},
    name: undefined,
};

export default Company;
