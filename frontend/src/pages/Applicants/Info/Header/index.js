import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { SubheaderWrapper } from 'components';

import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const applicant = useSelector(getCurrentApplicantSelector);

    return (
        <SubheaderWrapper className={classNames(className)}>
            <PaddingWrapper>
                <Typography variant="h5">
                    <Box fontWeight="fontWeightBold" className={styles.name}>
                        {applicant?.id ? `${applicant?.name} (#${applicant?.id})` : null}
                    </Box>
                </Typography>
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
