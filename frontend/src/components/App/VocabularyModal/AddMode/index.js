import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Input, Button } from 'components/Form-NEW';
import { getVocabularyModeSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { ADD_MODE } from 'settings/constants/modes';

import styles from './styles.module.scss';

const AddMode = (props) => {
    const { className } = props;
    const vocabularyMode = useSelector(getVocabularyModeSelector);
    const { translate } = useTranslate();

    return (
        <div className={classNames(styles.addMode, { [styles.hidden]: vocabularyMode !== ADD_MODE }, className)}>
            <Input className={styles.input} variant={Input.LIGHT_FULL} />
            <Button title={translate.Save} />
        </div>
    );
};

AddMode.propTypes = {
    className: PropTypes.string,
};

AddMode.defaultProps = {
    className: '',
};

export default AddMode;
