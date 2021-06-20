/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Button, Input, Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyLinkTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyLinkTypesEffect } from 'store/effects/vocabulary';

import { emptyLink } from 'settings/constants/templates';
import styles from './styles.module.scss';

const Links = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const dispatch = useDispatch();
    const { linkTypes, isIdle } = useSelector(getVocabularyLinkTypesSelector);

    useEffect(() => setValues(value), [value]);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyLinkTypesEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangeLinkType = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], linkType: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddLink = () => {
        const newValue = [...values, ...Links.defaultProps.value];
        setValues(newValue);
        onChange(newValue);
    };

    const onChangeLink = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], link: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onRemove = (index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1);
        setValues(clonedValues);
        onChange(clonedValues);
    };

    return (
        <div className={classNames(styles.fieldsArray, className)}>
            <div className={styles.label}>{translate.Links}</div>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Select
                        name="linkType"
                        label={translate.Type}
                        className={styles.type}
                        options={linkTypes}
                        onChange={(event) => onChangeLinkType(event, index)}
                        value={val?.linkType || ''}
                    />
                    <Input
                        label={translate.Link}
                        className={styles.link}
                        value={val?.link}
                        onChange={(event) => onChangeLink(event, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addPhone} color="primary" onClick={onAddLink} title={translate.AddLink} />
        </div>
    );
};

Links.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
};

Links.defaultProps = {
    className: '',
    value: [emptyLink],
    onChange: () => {},
};

export default Links;
