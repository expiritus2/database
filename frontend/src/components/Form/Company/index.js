import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { getVocabularyCompaniesEffect } from 'store/effects/vocabulary';
import { getVocabularyCompaniesSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { Select } from 'components/Form-NEW';

import styles from './styles.module.scss';

const Company = (props) => {
    const { className, onChange, value, name } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { companies } = useSelector(getVocabularyCompaniesSelector);

    useEffect(() => {
        dispatch(getVocabularyCompaniesEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    const createOptions = () => (
        companies.map((company) => ({ id: company?.id, label: company?.name, value: company?.name }))
    );

    return (
        <div className={classNames(styles.education, className)}>
            <Select
                name={name}
                multiple={false}
                search
                label={translate.Company}
                variant={Select.LIGHT_FULL}
                onChange={onChange}
                value={value}
                options={createOptions()}
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
