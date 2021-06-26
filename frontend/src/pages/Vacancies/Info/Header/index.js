import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { getCurrentVacancySelector } from 'store/selectors/vacancy';
import { SubheaderWrapper, InfoHeaderName } from 'components';

import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const { vacancy } = useSelector(getCurrentVacancySelector);

    return (
        <SubheaderWrapper className={classNames(styles.header, className)}>
            <PaddingWrapper>
                <InfoHeaderName>
                    {vacancy?.id ? `${vacancy?.position?.label} (#${vacancy?.id})` : null}
                </InfoHeaderName>
            </PaddingWrapper>
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
