import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useTranslate } from 'hooks';
import { Checkbox } from 'components';
import { getApplicantsSearchSelector } from 'store/selectors/applicants';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from './styles.module.scss';

const Active = (props) => {
    const { onChange, className } = props;
    const { translate } = useTranslate();
    const search = useSelector(getApplicantsSearchSelector);

    return (
        <div className={classNames(styles.actives, className)}>
            <FormControlLabel
                control={<Checkbox onChange={onChange} checked={search?.active} />}
                label={translate.Active}
            />
        </div>
    );
};

Active.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
};

Active.defaultProps = {
    className: '',
    onChange: () => {},
};

export default Active;
