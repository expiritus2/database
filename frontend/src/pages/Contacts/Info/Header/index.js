import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getCurrentContactSelector } from 'store/selectors/contact';
import { SubheaderWrapper } from 'components';

import PaddingWrapper from '../PaddingWrapper';

import styles from './styles.module.scss';

const Header = (props) => {
    const { className } = props;
    const contact = useSelector(getCurrentContactSelector);

    return (
        <SubheaderWrapper className={classNames(className)}>
            <PaddingWrapper>
                <Typography variant="h5">
                    <Box fontWeight="fontWeightBold" className={styles.name}>
                        {contact?.id ? `${contact?.name} (#${contact?.id})` : null}
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
