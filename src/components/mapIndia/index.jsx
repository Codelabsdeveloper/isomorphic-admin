/* eslint-disable max-len */
/*
 * File: index.jsx
 * Project: codelabs-boilderplate
 * Created Date: Wed Sep 28 2022 1:09:37 AM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import usePrevious from '@Hooks/usePrevious';
import styles from './MapMyIndia.module.scss';
import pin from '@Assets/images/pindark.png';
import activepin from '@Assets/images/activepin.png';
import { Spin } from 'antd';

let map;
const Maps = (props) => {
  let mapNode = useRef(null);

  var marker = [];

  const {
    center,
    // zoomControl,
    // location,
    // zoom,
    // hybrid,
    // search,
    // Map events
    onResize,
    onZoom,
    onMove,
    onClick,
    onDblclick,
    onMousedown,
    onMouseup,
    onMouseover,
    onMouseout,
    onKeypress,
    // on Load
    onMapLoad,
    markers,
    getClickedPoint,
    latitudeArr,
    longitudeArr,
    reRendermap,
    pan,
  } = props;

  const [isReadyMap, setIsReadyMap] = useState(true);

  const previousMarkers = usePrevious(markers);

  // Initialize Map
  const initializeMap = () => {
    const timer = setInterval(() => {
      let tried = 0;
      if (window.mappls && window.mappls.Map) {
        clearInterval(timer);
        /**
         * Init Map
         */
        // var container = window.mappls.DomUtil.get('map');
        // if (container != null) {
        //   container._leaflet_id = null;
        // }
        // window.container = container;
        // if (container) {
        // map = new window.MapmyIndia.Map(mapNode?.current, {
        //   center:center,
        //   zoomControl:zoomControl,
        //   // location:location,
        //   zoom:zoom,
        //   hybrid:hybrid,
        //   search:search
        // });

        // if (window.L) {
        //   window.L.marker(markers).addTo(map);
        // }

        /**
         * Attach events
         */
        onResize && map.addEventListener('resize', onResize);
        onZoom && map.addEventListener('zoom', onZoom);
        onClick && map.addEventListener('click', onClick);
        onDblclick && map.addEventListener('dblclick', onDblclick);
        onKeypress && map.addEventListener('keypress', onKeypress);
        onMousedown && map.addEventListener('mousedown', onMousedown);
        onMouseout && map.addEventListener('resize', onMouseout);
        onMouseover && map.addEventListener('mouseover', onMouseover);
        onMove && map.addEventListener('move', onMove);
        onMouseup && map.addEventListener('mouseup', onMouseup);

        // add Mulitple Calls
        addMulitpleMarkers(latitudeArr, longitudeArr);

        onMapLoad && onMapLoad(map);
        // }
        setIsReadyMap(false);
      } else {
        tried++;
        tried === 1500 && clearInterval(timer);
      }
    }, 100);
    return timer;
  };

  const addMulitpleMarkers = (latitudeArr, longitudeArr) => {
    mapmyindia_removeMarker();
    for (var i = 0; i < latitudeArr?.length; i++) {
      var position = new window.mappls.LatLng(
        latitudeArr[i].lat,
        longitudeArr[i].lng
      ); /*WGS location object*/
      // var icons = window.mappls.icon({
      //   iconUrl: pin.src,
      //   iconRetinaUrl: pin.src,
      //   iconSize: [30, 40],
      //   popupAnchor: [-3, -15],
      // });
      // activepin
      // var activePin = window.mappls.icon({
      //   iconUrl: activepin.src,
      //   iconRetinaUrl: activepin.src,
      //   iconSize: [30, 40],
      //   popupAnchor: [-3, -15],
      // });
      marker.push(addMarker(position, latitudeArr[i].isSpaceOccupied, '', ''));
      // marker.push(addMarker(position, '', '', ''));
    }
    mapmyindia_fit_markers_into_bound();
  };

  function mapmyindia_fit_markers_into_bound() {
    if (latitudeArr && longitudeArr) {
      let latArr = latitudeArr.map((it) => it.lat);
      let lonArr = longitudeArr.map((it) => it.lng);
      var maxlat = Math.max.apply(null, latArr);
      var maxlon = Math.max.apply(null, lonArr);
      var minlat = Math.min.apply(null, latArr);
      var minlon = Math.min.apply(null, lonArr);
      var southWest = window.mappls.LatLng(maxlat, maxlon); /*south-west WGS location object*/
      var northEast = window.mappls.LatLng(minlat, minlon); /*north-east WGS location object*/
      var bounds = window.mappls.LatLngBounds(
        southWest,
        northEast
      ); /*This class represents bounds on the Earth sphere, defined by south-west and north-east corners*/
      map?.fitBounds(
        bounds
      ); /*Sets the center map position and level so that all markers is the area of the map that is displayed in the map area*/
    }
  }

  // function addOccupiedMarkers(position, icon, title, draggable) {
  //   /* position must be instance of L.LatLng that replaces current WGS position of this object. Will always return current WGS position.*/

  //   // console.log("position -----> :::", position);
  //   var mk = new window.L.Marker(position, {
  //     icon: icon,
  //     draggable: draggable,
  //     title: title,
  //   }); /*marker with a default icon and optional param draggable, title */

  //   map.addLayer(mk); /*add the marker to the map*/
  //   /* marker events:*/
  //   mk.on('click', function (e) {
  //     getClickedPoint(e);
  //   });

  //   return mk;
  // }

  function addMarker(position, icon, title, draggable) {
    /* position must be instance of L.LatLng that replaces current WGS position of this object. Will always return current WGS position.*/

    // console.log("position-----", position);

    var mk = new window.mappls.Marker({
      map,
      position,
      draggable: draggable,
      title: title,
      // fitbounds: true,
      html: icon
        ? `<div><img class="dropup" src=${pin.src}></div>`
        : `<div><img class="dropup" src=${activepin.src}></div>`,
      // icon,
    }); /*marker with a default icon and optional param draggable, title */
    // mk.setIcon
    // map?.addLayer(mk); /*add the marker to the map*/
    /* marker events:*/
    mk.addListener('click', function (e) {
      getClickedPoint(position, e);
    });

    return mk;
  }

  function mapmyindia_removeMarker() {
    var markerlength = marker.length;
    if (markerlength > 0) {
      for (var i = 0; i < markerlength; i++) {
        if (map?.removeLayer) {
          map.removeLayer(marker[i]); /* deletion of marker object from the map */
        }
      }
    }
    marker = null;
    marker = [];
  }

  // Load Map
  const loadMap = () => {
    initializeMap();
  };

  // Remove Map on unmount
  useEffect(() => {
    return () => {
      if (map !== null) {
        // map?.off();
        // map?.remove();
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (window.mappls) {
        map = new window.mappls.Map('map', {
          center,
          zoomControl: true,
          search: true,
          location: true,
          zoom: 12,
          tilt: 90,
        });
        loadMap();
      }
    }, 500);
  }, [reRendermap]);

  useEffect(() => {
    if (map && pan.length) {
      var pt = new window.mappls.LatLng(pan[0], pan[1]);
      if (map.panTo) {
        map.setZoom(15);
        map.panTo(pt);
      }
    }
  }, [pan, map]);

  // Load Map when node is ready
  useEffect(() => {
    if (!map && isReadyMap) {
      loadMap();
    }
  }, [map, mapNode, isReadyMap]);

  // Reload Map if not loaded
  useEffect(() => {
    if (!isReadyMap) {
      loadMap();
    }
  }, [isReadyMap]);

  // Update Markers
  useEffect(() => {
    if (!isEqual(markers, previousMarkers)) {
      removeMarkers();
    }
  }, [markers]);

  // Hanlde remove Markers
  const removeMarkers = () => {
    markers?.map((mk) => map?.removeLayer && map?.removeLayer(mk));
  };

  return (
    <>
      <div ref={(e) => (mapNode.current = e)} id="map" className={styles.mapIndia}></div>
      {mapNode?.current === null && (
        <div className={styles.maploader}>
          <Spin />
        </div>
      )}
    </>
  );
};

Maps.defaultProps = {
  center: [18.5314, 73.8446],
  zoomControl: true,
  hybrid: true,
  location: true,
  search: true,
  zoom: 15,
  markers: [],
};

Maps.propTypes = {
  // map attributes
  center: PropTypes.array,
  zoomControl: PropTypes.bool,
  location: PropTypes.bool,
  zoom: PropTypes.number,
  hybrid: PropTypes.bool,
  search: PropTypes.bool,

  // Map events
  onResize: PropTypes.func,
  onZoom: PropTypes.func,
  onMove: PropTypes.func,
  onClick: PropTypes.func,
  onDblclick: PropTypes.func,
  onMousedown: PropTypes.func,
  onMouseup: PropTypes.func,
  onMouseover: PropTypes.func,
  onMouseout: PropTypes.func,
  onKeypress: PropTypes.func,
  onMapLoad: PropTypes.func,

  // Markers
  markers: PropTypes.array,

  // Custom
  getClickedPoint: PropTypes.func,
  latitudeArr: PropTypes.array,
  longitudeArr: PropTypes.array,
  reRendermap: PropTypes.bool,
  pan: PropTypes.array,
};

export default Maps;
