/*
 * File: index.js
 * Project: codelabs-boilderplate
 * Created Date: Thu Sep 08 2022 11:34:47 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { useState, useEffect } from 'react';
import AppConfig from '@App/appConfig/AppConfig';
import { Row, Slider, Col } from 'antd';
import dynamic from 'next/dynamic';
import Button from '@Atoms/button';
import LoginLayout from '@Atoms/loginLayout';
import { useRouter } from 'next/router';
import CampaignMockup from '@Assets/images/campaign-mockup.png';
import styles from '@Styles/Audience.module.scss';
import Label from '@Atoms/label';
import AntdSelect from '@Atoms/AntdSelect';
import AntdInput from '@Atoms/AntdInput';
// import { name, number } from '@Helpers/FieldValidator';
import AntdAlert from '@Atoms/AntdAlert';
import { registerAudienceGoals, loadBrandDetailsAction } from '@Store/brand-register/brandAction';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { useDispatch, useSelector } from 'react-redux';

const GMapSearch = dynamic(() => import('@Components/gMapSearch'), { ssr: false });

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

const AudienceGoals = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [ageRange, setAgeRange] = useState([30, 40]);
  const [isMounted, setMouted] = useState(false);
  const [values, setValues] = useState({ gender: '', profession: '', householdIncome: '' });
  // const [genderError, setGenderError] = useState(false);
  // const [professionError, setProfessionError] = useState(false);
  // const [householdIncomeError, setHouseholdIncomeError] = useState(false);
  const [regionList, setRegiosList] = useState([]);
  const [brandDetails, setBrandDetails] = useState(null);
  const [isNextBtnDisabled, setNextBtnDisabled] = useState(true);

  const brandDetailsResponse = useSelector((state) => state.brandSlice.brandRegisterReponse);

  const audienceGoalsResponse = useSelector((state) => state.brandSlice.audienceGoalsResponse);

  const { id } = getFromLocalStorage('AUTH') || {};

  useEffect(() => {
    setMouted(true);
    dispatch(loadBrandDetailsAction(id));
  }, []);

  useEffect(() => {
    if (brandDetailsResponse) {
      setBrandDetails(brandDetailsResponse);
    }
  }, [brandDetailsResponse]);

  useEffect(() => {
    if (Object.keys(audienceGoalsResponse).length && audienceGoalsResponse?.id) {
      router.push('/register-brand/thank-you');
    }
  }, [audienceGoalsResponse]);

  useEffect(() => {
    if (regionList.length > 0) {
      setNextBtnDisabled(false);
    } else {
      setNextBtnDisabled(true);
    }
    if (regionList.length === 3) {
      setValues({ ...values, address: '' });
    }
  }, [regionList]);

  const handleAddressChange = (data) => {
    setRegiosList([...regionList, data]);
  };

  const handleAgeRange = (values) => {
    setAgeRange(values);
  };

  const handleChangeGender = (value) => {
    // setGenderError(false);
    setValues({ ...values, gender: value });
  };

  const onChangeInput = (event, type) => {
    setValues({ ...values, [type]: event.target.value });
  };

  // const handleGenderBlur = () => {
  //   if (!values.gender || values.gender === '') {
  //     setGenderError(true);
  //   } else {
  //     setGenderError(false);
  //   }
  // };

  // const handleProfessionBlur = () => {
  //   values.profession === '' && name(values.profession)
  //     ? setProfessionError(true)
  //     : setProfessionError(false);
  // };

  // const handleHouseholdIncomeBlur = () => {
  //   number(values.householdIncome) ? setHouseholdIncomeError(true) : setHouseholdIncomeError(false);
  // };

  const onCloseAlert = (postalCode) => {
    let list = regionList;
    const indexOfObject = list.findIndex((item) => {
      return item.postalCode === postalCode;
    });
    list.splice(indexOfObject, 1);
    setRegiosList([...list]);
  };

  const handleLogin = () => {
    const payload = {
      name: brandDetails?.name,
      turnover: brandDetails?.turnover,
      regionDetails: regionList,
      startAgeRange: ageRange[0],
      endAgeRange: ageRange[1],
      gender: values?.gender,
      profession: values?.profession,
      householdIncome: values?.householdIncome,
      address: brandDetails?.address,
      area: brandDetails?.area,
      city: brandDetails?.city,
    };
    // console.log('payload----', { payload, userId: id });
    if (!isNextBtnDisabled) {
      dispatch(registerAudienceGoals({ payload, brandId: brandDetails?.id }));
    }
  };

  return (
    <LoginLayout
      title={AppConfig.getCMSMessage('register_brand.form2.title')}
      backgroundimg={CampaignMockup.src}
    >
      <>
        <Row gutter={15} className={`${styles.audience} fullwidth`}>
          <Row className={`${styles.formfield} fullwidth`}>
            <Label label="Age Ranges" required />
            {isMounted && (
              <Slider
                range
                defaultValue={ageRange}
                min={15}
                max={80}
                onAfterChange={(val) => handleAgeRange(val)}
                tooltip={{ open: true }}
                className={styles.slider}
              />
            )}
          </Row>
          <Row gutter={15} className="fullwidth">
            <Col md={8}>
              <AntdSelect
                required
                label="Gender"
                handleChange={handleChangeGender}
                options={GENDER_OPTIONS}
                // onBlur={handleGenderBlur}
                // errorMgs={genderError ? 'Plesae select gender' : ''}
                defaultValue={[GENDER_OPTIONS[0].value]}
              />
            </Col>
            <Col md={8}>
              <AntdInput
                placeholder="Profession"
                // errorMgs={professionError ? '*Please enter a valid profession' : ''}
                onChange={(e) => onChangeInput(e, 'profession')}
                value={values?.profession}
                // onBlur={handleProfessionBlur}
                label="Profession"
              />
            </Col>
            <Col md={8}>
              <AntdInput
                placeholder="Household Income"
                // errorMgs={householdIncomeError ? '*Please enter a valid Household Income' : ''}
                onChange={(e) => onChangeInput(e, 'householdIncome')}
                value={values?.householdIncome}
                // onBlur={handleHouseholdIncomeBlur}
                label="Household Income"
              />
            </Col>
          </Row>
          <Row>
            <GMapSearch
              handleAddressChange={handleAddressChange}
              values={values}
              onChangeInput={(e) => onChangeInput(e, 'address')}
              // addressError={addressError}
              label="Region"
              disabled={regionList.length === 3}
            />
          </Row>
          <Row>
            {regionList.length > 0 && <AntdAlert message="Regions List" fullwidth />}
            {regionList.map((item, index) => {
              return (
                <AntdAlert
                  key={index}
                  message={`${item.address} ${item.city}`}
                  type="warning"
                  fullwidth
                  closable
                  onClose={() => onCloseAlert(item.postalCode)}
                />
              );
            })}
          </Row>
          <Row justify="end">
            <Button
              size="small"
              onClick={handleLogin}
              action="submit"
              // isProcessing={loginBtnLoadingValue}
              processingLabel=""
              disabled={isNextBtnDisabled}
            >
              {AppConfig.getCMSMessage('register_brand.form1.next_button')}
            </Button>
          </Row>
        </Row>
      </>
    </LoginLayout>
  );
};

AudienceGoals.propTypes = {};

export default AudienceGoals;
