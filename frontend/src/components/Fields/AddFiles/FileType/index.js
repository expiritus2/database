import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Input } from 'components/Form';
import { GrEdit } from 'react-icons/gr';
import { GiSave } from 'react-icons/gi';

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

    return (
        <div className={classNames(styles.fileType, className)}>
            <div>
                {editMode ? <Input value={type} /> : <div>{type}</div>}
            </div>
            {!editMode
                ? <GrEdit onClick={onEdit} className={classNames(styles.icon)} />
                : <GiSave onClick={onSave} className={classNames(styles.icon)} />}
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
