/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Fri Sep 09 2022 6:58:04 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Menu,
  Card,
  Image as AntdImage,
  Button as AntdButton,
  Modal,
  // notification,
} from 'antd';
import { Switch } from 'antd';
import AntdSelect from '@Atoms/AntdSelect';
import styles from './StoreDetails.module.scss';
import {
  getCartAction,
  removeCartItemAction,
  postCampaignNameAction,
} from '@Store/register-cart/cartAction';
import Header from '@Atoms/header';
import EmptyCart from '@Assets/images/empty_cart.png';
// import AntdRange from '@Atoms/AntdRange';
import { useRouter } from 'next/router';
import Image from '@Atoms/image/Image';
// import { AiOutlineLogout } from 'react-icons/ai';
import AntdInput from '@Atoms/AntdInput';
import Typography from '@Atoms/typography';
import Button from '@Atoms/button';
import { AiOutlineDelete } from 'react-icons/ai';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FooterTimeline from '@Atoms/footerTimeline';
// import Logo from '@Assets/images/logo.png';

const noItemsInCartRender = (handleBack) => {
  return (
    <>
      <Col span={24}>
        <Row justify="center" className={styles.noItemsincart}>
          <Image src={EmptyCart.src} height="250px" />
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="center" className={styles.noItemsincart}>
          <Typography variant="h4">No Items in Cart</Typography>
        </Row>
      </Col>
      <Col span={24}>
        <Row justify="center" className={styles.noItemsincart}>
          <Button size="small" onClick={() => handleBack()}>
            Go Back
          </Button>
        </Row>
      </Col>
    </>
  );
};

const StoreDetails = () => {
  // const { Search } = Input;
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState('');
  // const [removeStoreModal, setRemoveStoreModal] = useState(false);
  const [cartDataResponse, setCartDataResponse] = useState([]);
  const [imagePreview, setImagePreview] = useState(false);
  const [campNameValue, setCampNameValue] = useState('');
  // const [enableContinue, setEnableContinue] = useState(false);
  // const [campFocus, setCampFocus] = useState(false);
  // const [ageRange, setRentalCost] = useState([30, 40]);
  // const [filters, setFilters] = useState('');

  // const SPACE_TYPE_DROPDOWN = [
  //   { label: 'Space Type', value: '', isDefault: true },
  //   { label: 'Pan shop', value: 'Pan shop' },
  //   { label: 'Kirana', value: 'Kirana' },
  //   { label: 'Supermarkets', value: 'Supermarkets' },
  //   { label: 'Retail Mall', value: 'Retail Mall' },
  //   { label: 'Bus stops', value: 'Bus stops' },
  //   { label: 'Street lamps', value: 'Street lamps' },
  // ];

  // const DIMENSIONS_DROPDOWN = [
  //   { label: 'Branding Dimension', value: '', isDefault: true },
  //   { label: '2 x 4', value: '2 x 4' },
  //   { label: '3 x 3', value: '3 x 3' },
  //   { label: '4 x 4', value: '4 x 4' },
  //   { label: '10 x 12', value: '10 x 12' },
  //   { label: '20 x 25', value: '20 x 25' },
  // ];

  // const [values, setValues] = useState({
  //   spaceType: '',
  //   rentalCost: '',
  //   brandingDimension: '',
  //   hoursOfBusiness: '',
  //   signType: '',
  //   byFootfall: '',
  //   moreOptions: '',
  // });

  useEffect(() => {
    // get the API for the details based on the the region selected
    dispatch(getCartAction());
  }, []);

  const cartItemsLocal = useSelector((state) => state.cartSlice.getCartDetails);

  useEffect(() => {
    let lx = cartItemsLocal?.items;
    setCartDataResponse(lx);
  }, [cartItemsLocal]);

  const handleMenuItemSelect = (menuItem) => {
    if (menuItem?.key === activeMenu) setActiveMenu('');
    else setActiveMenu(menuItem?.key);
  };

  const onSearch = (menuItem) => {
    if (!menuItem) {
      setActiveMenu('');
    } else {
      setActiveMenu(menuItem);
    }
  };

  const delItem = (item) => {
    dispatch(removeCartItemAction(item.orderId, item.id));
    setActiveMenu('');
  };

  // const handleContinue = () => {
  //   router.push('/calendar');
  // };

  const handleBack = () => {
    router.push('/preferences');
  };

  const openDeleteModal = (store) => {
    Modal.confirm({
      title: 'Remove Store',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to remove the store?',
      okText: 'Remove',
      okButtonProps: {
        danger: true,
        type: 'default',
      },
      onOk: () => delItem(store),
      cancelText: 'Back',
      cancelButtonProps: {
        type: 'default',
      },
    });
  };

  const defaultStoreListRender = () => {
    return (
      <>
        <Row className={styles.storeContainer}>
          {cartDataResponse &&
            cartDataResponse.length > 0 &&
            cartDataResponse.map((item, index) => {
              return (
                <Card className={styles.storeCard} key={index}>
                  <Row>
                    <Col span={4}>
                      <Typography variant="h4">Store Details</Typography>
                      <Typography variant="h5">{item.retailer.name}</Typography>
                      <Typography variant="p">{item.retailerSpace.address}</Typography>
                    </Col>
                    <Col span={4}>
                      <Typography variant="h4">Location Data</Typography>
                      <Typography variant="p">
                        Footfall{' - '}
                        {item.retailer.footFall}
                      </Typography>
                    </Col>
                    <Col span={4}>
                      <Typography variant="h4">Dimensions</Typography>
                      <Typography variant="p">{item.retailerSpace.dimension}</Typography>
                    </Col>
                    <Col span={4}>
                      <Typography variant="h4">Square Footage</Typography>
                      <Typography variant="p"></Typography>
                    </Col>
                    <Col span={8}>
                      <Typography variant="h4">Images</Typography>
                      <Row>
                        {item.retailerSpace.psUrlDetails &&
                          item.retailerSpace.psUrlDetails.map((item, index) => (
                            <Col span={8} key={index}>
                              <AntdImage src={item} height={100} width={75} />
                            </Col>
                          ))}
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <AntdButton type="link" danger onClick={() => openDeleteModal(item)}>
                      <AiOutlineDelete /> &nbsp; Remove Store
                    </AntdButton>
                  </Row>
                </Card>
              );
            })}
        </Row>
      </>
    );
  };

  const storeDetailsRender = (storeId) => {
    const store = cartDataResponse.find((item) => parseInt(item.id) === parseInt(storeId));
    return (
      <>
        <Row className={styles.storeContainer}>
          <Card className={styles.storeCard}>
            <Row>
              <Col span={6}>
                <Typography variant="h4">Store Details</Typography>
                <Typography variant="h5">{store.retailer.name}</Typography>
                <Typography variant="p">{store.retailerSpace.address}</Typography>
              </Col>
              <Col span={6}>
                <Typography variant="h4">Location Data</Typography>
                <Typography variant="p">
                  Footfall{' - '}
                  {store.retailer.footFall}
                </Typography>
              </Col>
              <Col span={6}>
                <Typography variant="h4">Brand Dimensions Availale</Typography>
                <Typography variant="p">
                  {store.retailerSpace.dimension} : {store.retailerSpace.cost}
                </Typography>
              </Col>
              <Col span={6} />
              <Col span={6}>
                <Typography variant="h4">Age Range</Typography>
              </Col>
              <Col span={6}></Col>
              <Col span={12} />
              <Col span={24}>
                <Typography variant="h4">Images</Typography>
                <AntdImage.PreviewGroup
                  preview={{
                    visible: imagePreview,
                    onVisibleChange: () => setImagePreview(!imagePreview),
                  }}
                >
                  <Row gutter={[5, 4]}>
                    {store.retailerSpace.psUrlDetails &&
                      store.retailerSpace.psUrlDetails.map((item, index) => (
                        <Col span={8} key={index}>
                          <AntdImage src={item} height={200} width={150} />
                        </Col>
                      ))}
                  </Row>
                </AntdImage.PreviewGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <AntdButton type="link" danger onClick={() => openDeleteModal(store)}>
                <AiOutlineDelete /> &nbsp; Remove Store
              </AntdButton>
            </Row>
          </Card>
        </Row>
      </>
    );
  };

  const contentRenderer = (activeMenu) => {
    if (activeMenu.length === 0) return defaultStoreListRender();
    else return storeDetailsRender(activeMenu);
  };
  const onChange = (checked) => {
    let fd = [...cartDataResponse];
    if (checked) {
      let x = fd.sort(function (fd, b) {
        return new Date(b.createdTs) - new Date(fd.createdTs);
      });
      setCartDataResponse(x);
    } else {
      let x = fd.sort(function (fd, b) {
        return new Date(fd.createdTs) - new Date(b.createdTs);
      });
      setCartDataResponse(x);
    }
  };
  const onChangeCost = (checked) => {
    let fd = [...cartDataResponse];
    if (checked) {
      let x = fd.sort(function (fd, b) {
        return new Date(b.retailerSpace.cost) - new Date(fd.retailerSpace.cost);
      });
      setCartDataResponse(x);
    } else {
      let x = fd.sort(function (fd, b) {
        return fd.retailerSpace.cost - b.retailerSpace.cost;
      });
      setCartDataResponse(x);
    }
  };

  const onChangeInput = (event) => {
    // console.log('Value' ,event);
    setCampNameValue(event.target.value);
    // setEnableContinue(true);
    // focused
  };

  const handleNameChange = () => {
    // console.log("cartDataResponse" ,campNameValue);
    // console.log("cartItemsLocal" ,cartItemsLocal);
    let payload = {
      name: campNameValue, //madate
      orderIds: [cartItemsLocal.id], //orderid
    };
    dispatch(postCampaignNameAction(payload));
  };

  // const sliderRef = useRef(null);

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 10 / 2.5,
  //   slidesToScroll: 3,
  //   arrows: false,
  // };

  // const handleSpaceTypeChange = (value) => {
  //   setValues({ ...values, spaceType: value });
  //   const filteredLocations = filteredData?.filter((item) => {
  //     if (item.retailer.retailerType === value) {
  //       return item;
  //     }
  //   });
  //   setFilteredData(filteredLocations);
  //   setFilteredMarkers(filteredLocations);
  // };

  // const handleBrandingDimensionChange = (value) => {
  //   setValues({ ...values, brandingDimension: value });
  //   if (value !== '') {
  //     const filteredLocations = filteredData?.filter((item) => {
  //       if (item.dimension === value) {
  //         return item;
  //       }
  //     });
  //     setFilteredData(filteredLocations);
  //     setFilteredMarkers(filteredLocations);
  //   }
  // };

  // const handleRangeChange = (values) => {
  //   setRentalCost(values);
  //   const filteredLocations = filteredData?.filter((item) => {
  //     if (values[0] >= item.cost && values[1] <= item.cost) {
  //       return item;
  //     }
  //   });
  //   setFilteredMarkers(filteredLocations);
  // };

  const getListArray = (cart) => {
    let ar = [];
    cart.map((itm) => {
      ar.push({ label: itm.retailer.name, value: itm.id });
    });
    return ar;
  };

  //  const handleContinueCancel = () => {
  //   notification.open({
  //     message: 'Campaign name mandatory',
  //     description:
  //       'Please Enter Campaign name to continue',
  //   });
  //  }

  return (
    <>
      <Header title="Store Details" />
      <Row className={styles.headerContainer}>
        <Col span={4}>
          <span className={styles.titleSpacing}>Filter by stores</span>
          {cartDataResponse && cartDataResponse.length > 0 && (
            <AntdSelect
              handleChange={(e) => onSearch(e)}
              noMargin
              options={getListArray(cartDataResponse)}
              placeholder="Search Stores"
              value={activeMenu}
              allowClear
            />
          )}
        </Col>
        <Col span={20}>
          <span className={styles.titleSpacing}>Sort By : </span>
          <Row>
            <Col span={2} />
            <Col span={6}>
              <span className={styles.titleSpacing}>By Date</span>
              <Switch defaultChecked onChange={onChange} />
            </Col>
            <Col span={6}>
              <span className={styles.titleSpacing}>By Location</span>
              <Switch defaultChecked onChange={onChange} />
            </Col>
            <Col span={6}>
              <span className={styles.titleSpacing}> By Cost</span>
              <Switch defaultChecked onChange={onChangeCost} />
            </Col>
          </Row>
        </Col>
      </Row>

      {cartDataResponse && cartDataResponse.length === 0 ? (
        noItemsInCartRender(handleBack)
      ) : (
        <Row>
          <Col span={4}>
            <Row className={styles.storesList}>
              <Row>
                <AntdInput
                  required
                  placeholder="Campaign Name"
                  // errorMgs={'Please enter a campaign name'}
                  onChange={(e) => onChangeInput(e, 'householdIncome')}
                  label="Campaign Name"
                  // focus={campFocus}
                  onBlur={handleNameChange}
                />
              </Row>
              <Typography variant="h5">Stores List </Typography>
              <hr />
              <Menu
                mode="inline"
                selectedKeys={activeMenu}
                onClick={(menuItem) => handleMenuItemSelect(menuItem)}
              >
                {cartDataResponse &&
                  cartDataResponse.map((item) => (
                    <Menu.Item key={item.id}>{item.retailer.name}</Menu.Item>
                  ))}
              </Menu>
            </Row>
          </Col>
          <Col span={20} className={styles.rightpane}>
            {contentRenderer(activeMenu)}
            <Row className={styles.timelinefooter}>
              {/* {enableContinue && campNameValue.length > 0 ? ( */}
                <FooterTimeline active="Review" nextRoute="/calendar" />
              {/* // ) : (
              //   <h3>Please enter Campaing Name</h3>
              // )} */}
            </Row>
          </Col>
        </Row>
      )}
      {/* {cartDataResponse && cartDataResponse.length > 0 && (
        <Row justify="space-between" className={styles.navButtons}>
          <Button size="small" onClick={() => handleBack()}>
            Back
          </Button>
          <Button size="small" onClick={() => handleContinue()}>
            Continue
          </Button>
        </Row>
      )} */}
    </>
  );
};

export default StoreDetails;
