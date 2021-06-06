import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { getVocabularyFileTypesEffect } from 'store/effects/vocabulary';
import { getVocabularyFileTypesSelector } from 'store/selectors/vocabulary';
import { Select } from 'components/Form';

import styles from './styles.module.scss';

const FileType = (props) => {
    const { className, getCustomStyles, selectWrapperClassName, value, onChange } = props;
    const dispatch = useDispatch();
    const { fileTypes, isIdle } = useSelector(getVocabularyFileTypesSelector);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyFileTypesEffect({}, { silent: true }));
        }
    });

    return (
        <div className={classNames(styles.fileTypeWrapper, className)}>
            <Select
                getCustomStyles={getCustomStyles}
                options={fileTypes}
                className={selectWrapperClassName}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

FileType.propTypes = {
    className: PropTypes.string,
    selectWrapperClassName: PropTypes.string,
    getCustomStyles: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    onChange: PropTypes.func,
};

FileType.defaultProps = {
    className: '',
    selectWrapperClassName: '',
    getCustomStyles: null,
    value: null,
    onChange: () => {},
};

export default FileType;
