import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import { getVocabularyWorkPlacesSelector } from 'store/selectors/vocabulary';
import { getVocabularyWorkPlacesEffect } from 'store/effects/vocabulary';

import styles from './styles.module.scss';

const Place = (props) => {
    const { className, onChange, value } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const { workPlaces } = useSelector(getVocabularyWorkPlacesSelector);

    useEffect(() => {
        dispatch(getVocabularyWorkPlacesEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    return (
        <div className={classNames(styles.placeWrapper, className)}>
            <Select
                multiple
                search
                label={translate.Place}
                variant={Select.LIGHT_FULL}
                onChange={onChange}
                value={value}
                options={workPlaces}
            />
        </div>
    );
};

Place.options = (translate) => [
    { label: translate.Remote, value: 'remote' },
    { label: translate.Office, value: 'office' },
];

Place.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.string)]),
};

Place.defaultProps = {
    className: '',
    onChange: () => {},
    value: [],
};

export default Place;
