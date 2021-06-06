import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Select } from 'components/Form';
import { GrEdit } from 'react-icons/gr';
import { GiSave } from 'react-icons/gi';
import { TiCancel } from 'react-icons/ti';

import styles from './styles.module.scss';

const FileType = (props) => {
    const { type, className } = props;
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

    return (
        <div className={classNames(styles.fileType, className)}>
            <div className={styles.info}>
                {editMode
                    ? <Select options={[]} className={styles.editInput} value={type} />
                    : <div>{type}</div>}
            </div>
            <div className={styles.actions}>
                {!editMode
                    ? <GrEdit onClick={onEdit} className={classNames(styles.icon)} />
                    : (
                        <div>
                            <TiCancel onClick={onCancel} className={classNames(styles.icon, styles.cancel)} />
                            <GiSave onClick={onSave} className={classNames(styles.icon, styles.save)} />
                        </div>
                    )}
            </div>
        </div>
    );
};

FileType.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
};

FileType.defaultProps = {
    className: '',
    type: '',
};

export default FileType;
