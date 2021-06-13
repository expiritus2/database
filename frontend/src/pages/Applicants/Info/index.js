/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ScrollWrapper, SalaryValue, InfoItem } from 'components';

import { useSelector } from 'react-redux';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { useTranslate } from 'hooks';
import Name from './Name';
import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';
import Phones from './Phones';
import Emails from './Emails';
import Languages from './Languages';
import Positions from './Positions';
import Skills from './Skills';
import Regions from './Regions';
import Information from './Information';
import Messengers from './Messengers';

import styles from './styles.module.scss';

const Info = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const applicant = useSelector(getCurrentApplicantSelector);

    return (
        <>
            <Header />
            {applicant ? (
                <>
                    <Actions />
                    <ScrollWrapper className={classNames(classNames(styles.info, styles.scroll), className)}>
                        <Name {...applicant} />
                        <div className={styles.details}>
                            <Phones phones={applicant?.phones} />
                            <Emails emails={applicant?.emails} />
                            <Messengers list={applicant?.messengers} />
                            <InfoItem
                                label={translate.Salary}
                                value={(
                                    <SalaryValue
                                        currency={applicant?.salary?.currency?.label}
                                        value={applicant?.salary?.amount}
                                    />
                                )}
                            />
                            <InfoItem
                                label={translate.Experience}
                                value={
                                    applicant?.experienceYears
                                        ? `${applicant?.experienceYears} ${translate.Years}`
                                        : ''
                                }
                            />
                            <Positions positions={applicant?.positions} />
                            <Skills skills={applicant?.skills} />
                            <InfoItem
                                label={translate.Place}
                                value={applicant?.workPlaces?.map((place) => place?.label).join(', ')}
                            />
                            <Regions regions={applicant?.regions} />
                            <InfoItem
                                label={translate.Education}
                                value={applicant?.education?.label}
                            />
                            <Languages list={applicant?.languageSkills} />
                            <Information value={applicant?.info} />
                        </div>
                    </ScrollWrapper>
                </>
            ) : <Empty />}
        </>
    );
};

Info.propTypes = {
    className: PropTypes.string,
};

Info.defaultProps = {
    className: '',
};

export default Info;
