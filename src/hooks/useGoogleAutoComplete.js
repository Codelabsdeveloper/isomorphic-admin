import GMaps from '@Utils/GMaps';
import { useEffect, useState } from 'react';

/**
 * Function useGoogleAutoComplete
 * @returns
 */

const useGoogleAutoComplete = (autoCompleteRef) => {
  const [autoCompleteAddress, setAutoCompleteAddress] = useState({} || null);

  let autoComplete;

  useEffect(() => {
    if (!autoCompleteRef?.current?.input) return null;

    async function fetchData() {
      let googleMapsApi = await GMaps.load();
      autoComplete =
        new googleMapsApi.maps.places.Autocomplete(autoCompleteRef.current?.input, {}) || {};

      autoComplete.setFields(['address_components', 'formatted_address']);
      autoComplete.setFields(['address_component', 'geometry']);
      autoComplete.addListener('place_changed', handlePlaceSelect);
    }

    if (autoCompleteRef?.current?.input) fetchData();
  }, [autoCompleteRef?.current?.input || GMaps.load()]);

  const handlePlaceSelect = () => {
    const addressObject = autoComplete.getPlace();
    const address_components = addressObject?.address_components ?? [];
    const lat = addressObject.geometry.location.lat();
    const lng = addressObject.geometry.location.lng();

    if (address_components && address_components.length > 0) {
      const newAddress = parseAddress(addressObject?.address_components, lat, lng);
      setAutoCompleteAddress({ ...newAddress });
    }
  };

  const parseAddress = (address_components = [], lat, lng) => {
    const addressList = address_components?.reduce((acc, addressComponent) => {
      const { types } = addressComponent;
      if (types.includes('street_number')) {
        acc.streetNumber = addressComponent?.short_name;
      } else if (types.includes('route')) {
        acc.street = addressComponent?.long_name;
      } else if (types.includes('locality')) {
        acc.city = addressComponent?.short_name;
      } else if (types.includes('administrative_area_level_1')) {
        acc.state = addressComponent?.short_name;
      } else if (types.includes('country')) {
        acc.country = addressComponent?.short_name;
      } else if (types.includes('postal_code')) {
        acc.postalCode = addressComponent?.short_name;
      }
      return acc;
    });

    return [
      {
        address: `${addressList?.long_name ?? ''}${
          addressList?.street ? `, ${addressList?.street}` : ''
        }${addressList?.city ? `, ${addressList?.city}` : ''}${
          addressList?.state ? `, ${addressList?.state}` : ''
        }${addressList?.postalCode ? `- ${addressList?.postalCode}` : ''}`,
        area: `${addressList?.long_name ?? ''} ${
          addressList?.street ? `, ${addressList?.street}` : ''
        }`,
        city: addressList?.city ?? '',
        state: addressList?.state ?? '',
        country: addressList?.country?.toLowerCase() ?? '',
        pinCode: addressList?.postalCode ?? '',
        latLng: {
          lat: lat ?? '',
          lng: lng ?? '',
        },
      },
    ];
  };
  return { autoCompleteAddress: autoCompleteAddress[0] };
};

export default useGoogleAutoComplete;
