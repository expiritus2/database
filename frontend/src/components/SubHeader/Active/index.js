import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Checkbox } from 'components';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from './styles.module.scss';

const Active = (props) => {
    const { onChange, className, search } = props;
    const { translate } = useTranslate();

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
    search: PropTypes.shape({
        active: PropTypes.bool,
    }).isRequired,
    onChange: PropTypes.func,
};

Active.defaultProps = {
    className: '',
    onChange: () => {},
};

export default Active;
