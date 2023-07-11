/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Mon Sep 26 2022 12:22:47 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Badge, notification } from 'antd';
// import Slider from 'react-slick';
import Icon from '@Atoms/icon/Icon';
import styles from '@Styles/Preferences.module.scss';
import dynamic from 'next/dynamic';
import Typography from '@Atoms/typography';
import AntdSelect from '@Atoms/AntdSelect';
import AntdRange from '@Atoms/AntdRange';
import Maps from '@Components/mapIndia';
// import AntdInput from '@Atoms/AntdInput';
// import Button from '@Atoms/button';
import Image from '@Atoms/image/Image';
import Logo from '@Assets/images/logo.png';
import AddToCartPopUp from '@Components/addToCartPopup';
// import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoDashboard } from 'react-icons/go';
import { useRouter } from 'next/router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  getLocationViewAction,
  addcartDetailsAction,
  cartNumberAction,
  getCartAction,
  addAllcartDetailsAction,
  clearAddAllResponse,
} from '@Store/register-cart/cartAction';
import SearchAreaList from '@Components/searchArea';
import usePrevious from '../../utils/usePrevious';
import { getFromLocalStorage } from '@Utils/StorageUtil';
import { STORAGE } from '@Constants/constants';
import { handleLogoutAction } from '@Store/login-store/loginAction';
import FooterTimeline from '@Atoms/footerTimeline';

const GMapSearch = dynamic(() => import('@Components/gMapSearch'), { ssr: false });
// const SIGN_OPTIONS = [
//   { label: 'Sign Type', value: '', isDefault: true },
//   { label: 'sign type 1', value: 'sign type 1' },
//   { label: 'sign type 2', value: 'sign type 2' },
//   { label: 'sign type 3', value: 'sign type 3' },
// ];
const footfall_OPTIONS = [
  { label: 'By Footfall', value: '', isDefault: true },
  { label: 'footfalls > 1000', value: 1000 },
  { label: 'footfalls > 5000', value: 5000 },
  { label: 'footfalls > 10000', value: 10000 },
];

const SPACE_TYPE_DROPDOWN = [
  { label: 'Space Type', value: '', isDefault: true },
  { label: 'Pan shop', value: 'Pan shop' },
  { label: 'Kirana', value: 'Kirana' },
  { label: 'Supermarkets', value: 'Supermarkets' },
  { label: 'Retail Mall', value: 'Retail Mall' },
  { label: 'Bus stops', value: 'Bus stops' },
  { label: 'Street lamps', value: 'Street lamps' },
];

// const MORE_OPTIONS = [
//   { label: 'MORE OPTIONS', value: '', isDefault: true },
//   { label: 'Panshops', value: 'Panshops' },
//   { label: 'Kirana', value: 'Kirana' },
//   { label: 'Supermarkets', value: 'Supermarkets' },
//   { label: 'Malls', value: 'Malls' },
//   { label: 'Bus stops', value: 'Bus stops' },
//   { label: 'Street lamps', value: 'Street lamps' },
// ];

const DIMENSIONS_DROPDOWN = [
  { label: 'Branding Dimension', value: '', isDefault: true },
  { label: '2 x 4', value: '2 x 4' },
  { label: '3 x 3', value: '3 x 3' },
  { label: '4 x 4', value: '4 x 4' },
  { label: '10 x 12', value: '10 x 12' },
  { label: '20 x 25', value: '20 x 25' },
];

// const TIME_DROPDOWN = [
//   { label: 'Hours of Business', value: '', isDefault: true },
//   { label: '12:00 PM - 4:00 PM', value: '12:00 PM - 4:00 PM' },
//   { label: '6:00 PM - 12:00 AM', value: '6:00 PM - 12:00 AM' },
//   { label: '6:00 PM - 3:00 AM', value: '6:00 PM - 3:00 AM' },
//   { label: '24/7', value: '24/7' },
// ];

const Preferences = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // const sliderRef = useRef(null);

  const [values, setValues] = useState({
    spaceType: '',
    rentalCost: '',
    brandingDimension: '',
    hoursOfBusiness: '',
    signType: '',
    byFootfall: '',
    moreOptions: '',
  });
  // const [genderError, setGenderError] = useState(false);
  const [elPosition, setElPosition] = useState({});
  const [filters, setFilters] = useState('');
  const [ageRange, setRentalCost] = useState([30, 40]);
  const [latitudeArr, setLatitudeArr] = useState([]);
  const [longitudeArr, setLongitudeArr] = useState([]);
  const [retailerData, setRetailerData] = useState({});
  const [popupData, setPopupData] = useState([]);
  // const [region, setRegion] = useState('');
  const [reRendermap, setRerenderMap] = useState(false);
  const [filterdAreaAddress, setFilteredAreaAddress] = useState([]);
  const [pan, setPan] = useState([12.9716, 77.5946]);
  const [isBtnDisabled, setBtnDisbaled] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [itemIds, setItemIds] = useState([]);

  const [itmCnt, setItemCnt] = useState(0);
  const locations = useSelector((state) => state?.cartSlice?.locationDetails);
  const cartItemsLocalCal = useSelector((state) => state.cartSlice.getCartDetails);
  const addAllCartItemsResponse = useSelector((state) => state.cartSlice.addAllCartResponse);

  useEffect(() => {
    if (!getFromLocalStorage(STORAGE.AUTH)) {
      router.push('/');
    }
    // get the API for the details based on the the region selected
    dispatch(getLocationViewAction());
    dispatch(getCartAction());
  }, []);

  useEffect(() => {
    if (addAllCartItemsResponse.length) {
      dispatch(getLocationViewAction());
      // Clear add All responses;
      dispatch(clearAddAllResponse());
      notification['success']({
        message: 'Success',
        description: 'Items addded to the cart',
      });
      dispatch(getCartAction());
    }
  }, [addAllCartItemsResponse]);

  // const locationDetailsErrorprops = useSelector((state) => state.cartSlice.locationDetailsError);
  const addCartProps = useSelector((state) => state.cartSlice.addCartDetails);
  const previousAddCartProps = usePrevious(addCartProps);

  useEffect(() => {
    if (locations.length) {
      setRetailerData(locations);
      setFilteredAreaAddress(locations);

      const latLngs = locations?.map((item) => {
        return {
          lat: item.latLng.lat,
          lng: item.latLng.lng,
          isSpaceOccupied: item?.isSpaceOccquied,
        };
      });
      const lats = latLngs.map((item) => {
        return { lat: item?.lat, isSpaceOccupied: item?.isSpaceOccupied };
      });
      const lngs = latLngs.map((item) => {
        return { lng: item?.lng, isSpaceOccupied: item?.isSpaceOccupied };
      });

      setTimeout(() => {
        setLatitudeArr(lats);
        setLongitudeArr(lngs);
      }, 500);
    }
  }, [locations]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setBtnDisbaled(false);
    }
  }, [cartItems]);

  useEffect(() => {
    if (
      addCartProps &&
      Object.keys(addCartProps).length &&
      previousAddCartProps &&
      previousAddCartProps != addCartProps
    ) {
      notification['success']({
        message: 'Success',
        description: 'Cart updated successfully',
      });
    }
  }, [addCartProps]);

  useEffect(() => {
    if (cartItemsLocalCal && cartItemsLocalCal.items) {
      let len = cartItemsLocalCal.items.length;

      // console.log("cart items length" ,len )
      dispatch(cartNumberAction(len));
      setItemCnt(len);
      if (len > 0) {
        let arr = cartItemsLocalCal.items.map((it) => it?.retailerSpace?.id || it?.retailerSpaceId);
        setBtnDisbaled(false);
        setItemIds(arr);
      }
    }
  }, [cartItemsLocalCal]);

  useEffect(() => {
    setRerenderMap(true);
  }, [retailerData]);

  const getFilterName = (item) => {
    switch (item) {
      case 'spaceType':
        return 'Space type';
      case 'rentalCost':
        return 'Rental cost';
      case 'brandingDimension':
        return 'Branding dimesion';
      case 'hoursOfBusiness':
        return 'Hours of business';
      case 'signType':
        return 'Sign type';
      case 'byFootfall':
        return 'By footfall';
      default:
        return item;
    }
  };

  useEffect(() => {
    const myFilters = Object.keys(values)
      .filter((item) => {
        if (item && values[item] !== '') {
          return item;
        }
      })
      .map((item) => {
        if (item && values[item] !== '') {
          return `${getFilterName(item)}: ${values[item]}`;
        }
      })
      .join(', ');
    setFilters(myFilters);
  }, [values]);

  const getPopupData = (latlng) => {
    const data = retailerData.filter((item) => {
      if (item?.latLng?.lat === latlng.lat && item?.latLng?.lng === latlng?.lng) {
        return item;
      }
    });
    setPopupData(data);
  };

  const getClickedPoint = (markerData) => {
    getPopupData(markerData);
    setElPosition({
      top: '10px',
      left: '10px',
    });
  };

  // const next = () => {
  //   sliderRef?.current?.slickNext();
  // };

  const routeDash = () => {
    router.push('/dashboard');
  };

  const routeStore = () => {
    router.push('/store-details');
  };

  // const previous = () => {
  //   sliderRef?.current?.slickPrev();
  // };

  const handleClosePopup = () => {
    setElPosition({});
  };

  const setFilteredMarkers = (filters) => {
    setLatitudeArr([]);
    setLongitudeArr([]);
    const latLngs =
      filters.length &&
      filters?.map((item) => {
        return {
          lat: item.latLng.lat,
          lng: item.latLng.lng,
          isSpaceOccupied: item?.isSpaceOccquied,
        };
      });
    const lats =
      latLngs?.length &&
      latLngs.map((item) => {
        return { lat: item?.lat, isSpaceOccupied: item?.isSpaceOccupied };
      });
    const lngs =
      latLngs?.length &&
      latLngs.map((item) => {
        return { lng: item?.lng, isSpaceOccupied: item?.isSpaceOccupied };
      });

    setTimeout(() => {
      setLatitudeArr(lats);
      setLongitudeArr(lngs);
    }, 500);
  };

  const handleFilterSpaceType = (filter) => {
    const filtered = locations?.filter((item) => {
      if (item.retailer.retailerType === filter) {
        return item;
      }
    });
    return filtered;
  };

  const handleFilterDimension = (filter) => {
    const filtered = locations?.filter((item) => {
      if (item.dimension === filter) {
        return item;
      }
    });
    return filtered;
  };

  const handleFilterFootFall = (fil) => {
    const filtered = locations?.filter((item) => {
      if (item.retailer.footFall > fil) {
        return item;
      }
    });
    return filtered;
  };

  useEffect(() => {
    const retailerType = values.spaceType;
    const dimension = values.brandingDimension;
    const footfall = values.byFootfall;
    const filteredSpace = retailerType?handleFilterSpaceType(retailerType):[];
    const filteredDimension = dimension ?handleFilterDimension(dimension):[];
    const filteredFootfall = footfall?handleFilterFootFall(footfall):[];
    // const mainFilter = [...filteredSpace, ...filteredDimension, ...filteredFootfall].filter(
    //   (item) => {
    //     if (
    //       item.dimension === dimension &&
    //       item.retailer.retailerType === retailerType &&
    //       item.retailer.footFall > footfall
    //     ) {
    //       return item;
    //     }
    //   }
    // );
    let mainFilter =[];
    if (filteredSpace.length){
      mainFilter = filteredSpace;
    }
    if (filteredDimension.length){
      let ids = filteredDimension.map(itm => itm.id);
      mainFilter = mainFilter.length ?mainFilter.filter((element) => {
        return ids.includes(element.id);
      }):filteredDimension;
    }
    if (filteredFootfall.length){
      let ids = filteredFootfall.map(itm => itm.id);
      mainFilter = mainFilter.length ?mainFilter.filter((element) => {
        return ids.includes(element.id);
      }):filteredFootfall;
    }

    const arrayUniqueByKey = [...new Map(mainFilter.map((item) => [item.id, item])).values()];

    setFilteredMarkers(arrayUniqueByKey.length || retailerType || dimension
       || footfall ?arrayUniqueByKey:locations);

       setFilteredAreaAddress(arrayUniqueByKey.length || retailerType || dimension
        || footfall ?arrayUniqueByKey:locations);
  }, [values]);

  const handleSpaceTypeChange = (value) => {
    setValues({ ...values, spaceType: value });
  };

  const handleBrandingDimensionChange = (value) => {
    setValues({ ...values, brandingDimension: value });
  };

  // const handleHoursOfBusinessChange = (value) => {
  //   setValues({ ...values, hoursOfBusiness: value });
  // };

  // const handleSignTypeChange = (value) => {
  //   setValues({ ...values, signType: value });
  // };

  const handleByFootfallChange = (value) => {
    setValues({ ...values, byFootfall: value });
  };

  // const handleChangeMoreOptions = (value) => {
  //   setValues({ ...values, moreOptions: value });
  // };

  const handleRangeChange = (values) => {
    setRentalCost(values);
    // const filteredLocations = filteredData?.filter((item) => {
    //   if (values[0] >= item.cost && values[1] <= item.cost) {
    //     return item;
    //   }
    // });
    // setFilteredMarkers(filteredLocations);
  };

  const handleAddressChange = (data) => {
    // setRegion(data);
    setPan([data.latLng.lat, data.latLng.lng]);
  };

  // const onChangeInput = (event, type) => {
  //   setValues({ ...values, [type]: event.target.value });
  // };

  // const handleContinue = () => {
  //   router.push('/store-details');
  // };

  const handleAddAllToCart = () => {
    const filteredItems = filterdAreaAddress
      .filter((item) => {
        return !item?.isSpaceOccquied && item;
      })
      .map((item) => {
        return { retailerSpaceId: item.id};
      });

    const payload = filteredItems;
    if (filteredItems.length==0){
      notification['error']({
        message: 'Ops',
        description: 'There are no new items to be added to the cart',
      });
    }
    dispatch(addAllcartDetailsAction(payload));
  };

  const handleAddCart = (data) => {
    // eslint-disable-next-line no-console
    setCartItems([...cartItems, data]);

    const payload = {
      // if these details are not thr Please dont sent it
      retailerSpaceId: data.id,
    };
    dispatch(addcartDetailsAction(payload));
  };

  const filterarea = (event) => {
    const fitlered = retailerData?.filter((item) => {
      const name = item.retailer.name.toLowerCase().includes(event.target.value.toLowerCase());
      const address = item.address.toLowerCase().includes(event.target.value.toLowerCase());

      return (name || address) && item;
    });
    setFilteredAreaAddress(fitlered);
  };

  const handleClickarea = (area) => {
    getPopupData(area.latLng);
    setElPosition({
      top: '10px',
      left: '10px',
    });
    setPan([area.latLng.lat, area.latLng.lng]);
  };

  const handleLogout = () => {
    dispatch(handleLogoutAction());
    window.localStorage.clear();
    router.push('/');
  };

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 10 / 2.5,
  //   slidesToScroll: 3,
  //   arrows: false,
  // };

  return (
    <>
      <Row className={styles.preferences}>
        <Col md={4}>
          <Row className={styles.card}>
            <Row className={styles.header}>
              <Row className={styles.logo}>
                <Image className={styles.imgLogo} src={Logo.src} />
              </Row>
            </Row>
          </Row>
        </Col>
        <Col md={20}>
          <Row className={styles.mapcontainer}>
            <Row className={styles.preferencesheader}>
              <Row className={`${styles.titleheader} fullwidth`}>
                <Typography variant="p">Preferences</Typography>
                <Row className={styles.iconcontainer}>
                  <span onClick={routeDash}>
                    <GoDashboard /> <span className={styles.text}>Dashboard</span>
                  </span>
                  <span onClick={() => handleLogout()}>
                    <AiOutlineLogout /> <span className={styles.text}>Logout</span>
                  </span>
                </Row>
              </Row>
              <Row className={styles.filtersheader}>
                <Col md={14} className={styles.slidercontainer}>
                  <Row className="fullwidth">
                    <Col md={1}>
                      {/* <Row className={`fullwidth ${styles.sliderBtns}`} onClick={previous}>
                        <span>
                          <BsChevronLeft />
                        </span>
                      </Row> */}
                    </Col>
                    <Col md={24}>
                      <Row className={styles.dropdownslist}>
                        <Row className={styles.dropdown}>
                          <AntdSelect
                            handleChange={handleSpaceTypeChange}
                            noMargin
                            options={SPACE_TYPE_DROPDOWN}
                            placeholder="SPACE TYPE"
                            value={values?.spaceType}
                          />
                        </Row>

                        <Row className={styles.dropdown}>
                          <AntdSelect
                            handleChange={handleBrandingDimensionChange}
                            noMargin
                            options={DIMENSIONS_DROPDOWN}
                            placeholder="BRANDING DIMENSIONS"
                            value={values?.brandingDimension}
                          />
                        </Row>

                        <Row className={styles.dropdown}>
                          <AntdSelect
                            handleChange={handleByFootfallChange}
                            noMargin
                            options={footfall_OPTIONS}
                            placeholder="BY FOOTFALL"
                            value={values?.byFootfall}
                            // disabled
                          />
                        </Row>
                      </Row>
                      {/* <Slider {...settings} className="slider" ref={sliderRef}>
                        <div>
                          <Row className={styles.selectsection}>
                            <AntdSelect
                              handleChange={handleSpaceTypeChange}
                              noMargin
                              options={SPACE_TYPE_DROPDOWN}
                              placeholder="SPACE TYPE"
                              value={values?.spaceType}
                            />
                          </Row>
                        </div>
                        <div>
                          <Row className={styles.selectsection}>
                            <AntdSelect
                              handleChange={handleBrandingDimensionChange}
                              noMargin
                              options={DIMENSIONS_DROPDOWN}
                              placeholder="BRANDING DIMENSIONS"
                              value={values?.brandingDimension}
                            />
                          </Row>
                        </div> */}
                      {/* <div>
                          <Row className={styles.selectsection}>
                            <AntdSelect
                              handleChange={handleHoursOfBusinessChange}
                              noMargin
                              options={TIME_DROPDOWN}
                              placeholder="HOURS OF BUSINESS"
                              value={values?.hoursOfBusiness}
                              disabled
                            />
                          </Row>
                        </div> */}
                      {/* <div>
                          <Row className={styles.selectsection}>
                            <AntdSelect
                              handleChange={handleSignTypeChange}
                              noMargin
                              options={SIGN_OPTIONS}
                              placeholder="SIGN TYPE"
                              value={values?.signType}
                              disabled
                            />
                          </Row>
                        </div> */}
                      {/* <div>
                          <Row className={styles.selectsection}>
                            <AntdSelect
                              handleChange={handleByFootfallChange}
                              noMargin
                              options={footfall_OPTIONS}
                              placeholder="BY FOOTFALL"
                              value={values?.byFootfall}
                              disabled
                            />
                          </Row>
                        </div>
                        <div />
                      </Slider> */}
                    </Col>
                    <Col md={1}>
                      {/* <Row className={`fullwidth ${styles.sliderBtns}`} onClick={next}>
                        <span>
                          <BsChevronRight />
                        </span>
                      </Row> */}
                    </Col>
                  </Row>
                </Col>
                <Col md={10} className={styles.filtercol}>
                  <Row className={`fullwidth ${styles.profilecontainer}`}>
                    <Col md={16}>
                      <Row gutter={5}>
                        <Col md={24}>
                          <Row>
                            {/* <AntdSelect
                              handleChange={handleSpaceTypeChange}
                              noMargin
                              options={SPACE_TYPE_DROPDOWN}
                              placeholder="SPACE TYPE"
                              value={values?.spaceType}
                            /> */}
                          </Row>
                          <Row className={styles.range}>
                            <AntdRange range={ageRange} handleRangeChange={handleRangeChange} />
                          </Row>
                        </Col>
                        {/* <Col md={12}>
                          <Row className={styles.moreoptions}>
                            <AntdSelect
                              handleChange={handleChangeMoreOptions}
                              noMargin
                              options={MORE_OPTIONS}
                              placeholder="MORE OPTIONS"
                              popupClassName={styles.customewidht}
                              value={values?.moreOptions}
                            />
                          </Row>
                          <Row className={styles.salescheckbox}>
                            <Checkbox onChange={onChange}>
                              <Typography variant="p">SALES/DEALS/OFFERS</Typography>
                            </Checkbox>
                          </Row>
                        </Col> */}
                      </Row>
                    </Col>
                    <Col md={8}>
                      <Row className={`fullwidth ${styles.profilecart}`}>
                        <Row className={styles.profile} onClick={routeDash}>
                          {/* <GoDashboard /> */}
                        </Row>
                        <Row className={styles.cart}>
                          My Cart{' '}
                          {itmCnt ? (
                            <Badge count={itmCnt} onClick={routeStore}>
                              <Icon
                                className={styles.selectboxHeaderIcon}
                                iconName="shopping_bag_white"
                              />
                            </Badge>
                          ) : (
                            <Icon
                              className={styles.selectboxHeaderIcon}
                              iconName="shopping_bag_white"
                            />
                          )}
                        </Row>
                        {/* <Row className={`fullwidth ${styles.sliderBtns}`} onClick={routeDash}>
                        <span>
                          <BsChevronRight />
                        </span>
                      </Row> */}
                        <Row className={styles.profile}>
                          <Row onClick={() => handleLogout()}>{/* <AiOutlineLogout /> */}</Row>
                        </Row>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className={filters.length > 0 ? styles.myfilters : styles.allPadding}>
                {filters.length > 0 && `Filters: ${filters}`}
              </Row>
            </Row>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={4} className={styles.searchareacontainer}>
          {/* <Row className={styles.searchareacontainer}> */}
          {/* <AntdInput
            placeholder="Search Area"
            // errorMgs={professionError ? '*Please enter a valid profession' : ''}
            onChange={(e) => filterarea(e)}
            // value={values?.profession}
            // onBlur={handleProfessionBlur}
            label="Search Area"
          /> */}
          <GMapSearch
            handleAddressChange={handleAddressChange}
            // values={region}
            onChangeInput={(e) => filterarea(e)}
            label="Search Area"
            required={false}
          />
          <Row>
            <SearchAreaList
              areas={filterdAreaAddress}
              handleClick={handleClickarea}
              handleAddCart={handleAddCart}
              handleAddAllToCart={handleAddAllToCart}
              itemIds={itemIds}
            />
          </Row>

          {/* </Row> */}
        </Col>
        <Col span={20}>
          {Object.keys(elPosition).length > 0 && (
            <AddToCartPopUp
              position={elPosition}
              popupData={popupData[0]}
              handleClosePopup={handleClosePopup}
              handleAddCart={handleAddCart}
              itemIds={itemIds}
            />
          )}
          <Row className={styles.mapbody}>
            <Row className={styles.mapContainer}>
              <Row className={styles.mapcontent}>
                {longitudeArr?.length && reRendermap ? (
                  <Maps
                    width="100%"
                    center={[12.9716, 77.5946]}
                    pan={pan}
                    markers={[28.61, 77.23]}
                    getClickedPoint={getClickedPoint}
                    latitudeArr={latitudeArr}
                    longitudeArr={longitudeArr}
                    retailerData={retailerData}
                    locations={locations}
                  />
                ) : (
                  <span />
                )}

                {!longitudeArr?.length ? (
                  <Maps
                    width="100%"
                    center={[12.9716, 77.5946]}
                    pan={pan}
                    markers={[28.61, 77.23]}
                    getClickedPoint={getClickedPoint}
                    retailerData={retailerData}
                  />
                ) : (
                  <span />
                )}
              </Row>
              <FooterTimeline
                active="Selection"
                isEnabled={!isBtnDisabled}
                nextRoute="/store-details"
              />
              {/* <Row className={styles.continueBtn} justify="flex-end">
                <Button
                  size="small"
                  action="submit"
                  processingLabel="Please wait..."
                  disabled={isBtnDisabled}
                  onClick={() => handleContinue()}
                >
                  Continue
                </Button>
              </Row> */}
            </Row>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Preferences;
