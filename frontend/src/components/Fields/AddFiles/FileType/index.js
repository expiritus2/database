import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setUnit } from 'helpers';

import { GrEdit } from 'react-icons/gr';
import { GiSave } from 'react-icons/gi';
import { TiCancel } from 'react-icons/ti';

import { FileType } from 'components';

import styles from './styles.module.scss';

const FileTypeComponent = (props) => {
    const { value, className, onChangeFileType } = props;
    const [editMode, setEditMode] = useState(false);

    const onEdit = () => {
        setEditMode(true);
    };

    const onSave = () => {
        setEditMode(false);
    };

    const onCancel = () => {
        setEditMode(false);
    };

    const getCustomStyles = (defaultStyles) => ({
        ...defaultStyles,
        container: (base) => ({
            ...base,
            margin: `${setUnit(-6)} 0`,
        }),
        control: (base) => ({
            ...(defaultStyles?.control(base) || {}),
            minHeight: setUnit(30),
            height: setUnit(30),
        }),
        valueContainer: (base) => ({
            ...base,
            height: setUnit(30),
        }),
        indicatorsContainer: (base) => ({
            ...base,
            height: setUnit(30),
        }),
    });

    return (
        <div className={classNames(styles.fileType, className)}>
            <div className={styles.info}>
                {editMode
                    ? (
                        <FileType
                            onChange={onChangeFileType}
                            value={value}
                            getCustomStyles={getCustomStyles}
                        />
                    )
                    : <div>{value?.label}</div>}
            </div>
            {!editMode
                ? <GrEdit onClick={onEdit} className={classNames(styles.icon)} />
                : (
                    <div className={styles.actions}>
                        <TiCancel onClick={onCancel} className={classNames(styles.icon, styles.cancel)} />
                        <GiSave onClick={onSave} className={classNames(styles.icon, styles.save)} />
                    </div>
                )}
        </div>
    );
};

FileTypeComponent.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        label: PropTypes.string,
    }),
    onChangeFileType: PropTypes.func,
};

FileTypeComponent.defaultProps = {
    className: '',
    value: {},
    onChangeFileType: () => {},
};

export default FileTypeComponent;
