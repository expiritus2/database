import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SubheaderWrapper } from 'components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslate } from 'hooks';

import Search from './Search';
import Actives from './Actives';
import Refresh from './Refresh';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const { translate } = useTranslate();

    return (
        <SubheaderWrapper className={classNames(styles.header, className)}>
            <Search className={styles.search} />
            <FormControlLabel
                className={classNames(styles.actives)}
                control={<Actives />}
                label={translate.Active}
            />
            <Refresh />
        </SubheaderWrapper>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};

Header.defaultProps = {
    className: '',
};

export default Header;
