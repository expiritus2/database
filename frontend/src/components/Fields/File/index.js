import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { readFiles } from 'helpers';
import { useTranslate } from 'hooks';
import { Button, Input, InputLabel } from 'components/Form';

import styles from './styles.module.scss';

const File = (props) => {
    const { id: elementId, className, value, onChange, label } = props;
    const { translate } = useTranslate();
    const [fileValue, setFileValue] = useState(value);

    const onChangeHandler = (event) => {
        readFiles(event.target.files).then((values) => {
            const newFilesValue = values
                .map((file) => ({ ...file, data: file?.data ? btoa(file?.data) : undefined }));
            setFileValue(newFilesValue);
            onChange(event.target.files, newFilesValue?.[0]);
        });
    };

    const onClickInputField = () => {

    };

    return (
        <div className={classNames(styles.test, className)}>
            <label className={styles.files} htmlFor={elementId}>
                <div className={styles.actions}>
                    <Input
                        className={styles.fileValue}
                        disabled
                        label={label}
                        value={fileValue?.filename}
                        onClick={onClickInputField}
                    />
                    <div>
                        <InputLabel label="&nbsp;" />
                        <Button className={styles.actionButton} color="primary" title={translate.Browse} />
                    </div>
                </div>
                <input multiple className={styles.nativeInput} id={elementId} type="file" onChange={onChangeHandler} />
            </label>
        </div>
    );
};

File.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    label: PropTypes.string,
};

File.defaultProps = {
    className: '',
    onChange: () => {},
    value: '',
    label: undefined,
};

export default File;
