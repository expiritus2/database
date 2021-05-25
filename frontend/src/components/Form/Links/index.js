/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Select, Button, Input } from 'components/Form-NEW';

import styles from './styles.module.scss';

const Links = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onChangeLinkType = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], type: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddLink = () => {
        const newValue = [...values, Links.defaultProps.value];
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
                        name="type"
                        label={translate.Type}
                        className={styles.type}
                        options={Links.linksOptions(translate)}
                        onChange={(event) => onChangeLinkType(event, index)}
                        value={val?.type || ''}
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

Links.linksOptions = (translate) => [
    { value: 'linkedin', label: translate.Linkedin },
    { value: 'site', label: translate.Site },
];

Links.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
};

Links.defaultProps = {
    className: '',
    value: [{ type: '', link: '' }],
    onChange: () => {},
};

export default Links;
