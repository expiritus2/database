/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    SalaryValue,
    InfoItem,
    PendingWrapper,
    InfoPositions,
    InfoEmails,
    InfoPhones,
    Information,
    InfoLinks,
    InfoRegions,
    InfoSkills,
    InfoMessengers,
    InfoLanguages,
    InfoScrollWrapper,
} from 'components';
import { useSelector } from 'react-redux';
import { getCurrentApplicantSelector } from 'store/selectors/applicant';
import { useTranslate } from 'hooks';
import { getDate } from 'helpers/date';
import Name from './Name';
import Actions from './Actions';
import Header from './Header';
import Empty from './Empty';

import styles from './styles.module.scss';

const Info = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const { applicant, isPending } = useSelector(getCurrentApplicantSelector);

    return (
        <>
            <Header />
            {applicant || isPending ? (
                <>
                    {!isPending && <Actions />}
                    <InfoScrollWrapper className={classNames(classNames(styles.info), className)}>
                        <PendingWrapper isPending={isPending}>
                            <Name {...applicant} />
                            <div className={styles.details}>
                                <InfoPhones phones={applicant?.phones} />
                                <InfoEmails emails={applicant?.emails} />
                                <InfoMessengers list={applicant?.messengers} />
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
                                <InfoPositions positions={applicant?.positions} />
                                <InfoSkills list={applicant?.skills} />
                                <InfoItem
                                    label={translate.Place}
                                    value={applicant?.workPlaces?.map((place) => place?.label).join(', ')}
                                />
                                <InfoRegions list={applicant?.regions} />
                                <InfoItem
                                    label={translate.Education}
                                    value={applicant?.education?.label}
                                />
                                <InfoLanguages list={applicant?.languageSkills} />
                                <InfoLinks list={applicant?.links} />
                                <InfoItem label={translate.BirthDate} value={getDate(applicant?.birthDate)} />
                                <Information value={applicant?.info} />
                            </div>
                        </PendingWrapper>
                    </InfoScrollWrapper>
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
