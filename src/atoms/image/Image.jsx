/*
 * File: Image.jsx
 * Project: codelabs-boilderplate
 * Created Date: Sun Aug 28 2022 8:04:37 PM
 * Author: Mohammed Parveez <ahamed.parveez@gmail.com>
 * ------------------------------------
 *
 * Copyright (c) 2022 All rights reserved by Codelabs
 * ------------------------------------
 */

import { arrayOf, number, oneOf, shape, string } from 'prop-types';
import { useRef } from 'react';
import LazyObserver from '../lazyObserver/LazyObserver';
import style from './Image.module.scss';

const onePixelImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const sortSrcSet = (srcSet) => srcSet?.sort((a, b) => a.breakPoint - b.breakPoint);

/**
 * Image Component
 * @param {string} src - Specifies the path to the image
 * @param {string} alt - Specifies an alternate text for the image
 * @param {string} id - Id attribute for image
 * @param {string} className - Custom Class to override styles
 * @param {array} srcSet - set of array images to use in different situations.
 * @param {string} loading - Mode of loading image supported (lazy|eager), defaults to lazy
 * @returns {*}
 */
const Image = (props) => {
  const { srcSet, loading, loaderClassName, ...restProps } = props;

  const imgRef = useRef(null);
  const isLazyLoadingEnabled = !imgRef.current?.loaded && loading === 'lazy';

  /**
   * If lazyloading is enabled, IntersectionObserver observers the image and updates the src
   */
  const handleOnIntersection = (elem) => {
    switchImageSrc(elem, elem?.dataset?.src);
  };

  // Incase if the browser doesn't support Intersection
  /* istanbul ignore next */
  const handleOnIntersectionFallback = (elem) => {
    switchImageSrc(elem, elem?.dataset?.src);
  };

  /**
   * Switch back the image url to original src
   * @param {object} elem - Image tag
   * @param {string} newSrc - src url
   */
  const switchImageSrc = (elem, newSrc) => {
    /* istanbul ignore else */
    if (elem && newSrc) {
      elem.src = newSrc;
      elem.removeAttribute('data-src');
      /* istanbul ignore else */
      if (imgRef.current) {
        imgRef.current.loaded = true;
      }
    }
  };

  // Rmoves Lazyloader class
  const removeLoader = (elem) => {
    [style.loader, loaderClassName].map((item) => {
      item && elem?.target?.classList?.remove(item);
      // if (item && elem?.target) {
      //   // once loaded, remove the height and make it responsive
      //   elem.target.style.height = 'auto';
      // }
    });
  };

  // Renders image tag with required props
  const renderImage = (imgProps) => {
    const { src, alt, id, className, ...restImgProps } = { ...restProps, ...imgProps };

    if (!src) return null;

    const fakeSrc = isLazyLoadingEnabled ? onePixelImg : src;
    const classes = [
      isLazyLoadingEnabled ? style.loader : '',
      isLazyLoadingEnabled ? loaderClassName : '',
      className,
    ]
      .join(' ')
      .trim();

    return (
      <LazyObserver
        observe={isLazyLoadingEnabled}
        handleOnIntersection={handleOnIntersection}
        handleOnIntersectionFallback={handleOnIntersectionFallback}
      >
        <img
          ref={imgRef}
          id={id}
          alt={alt}
          loading={loading}
          className={classes}
          src={fakeSrc}
          {...(isLazyLoadingEnabled && {
            'data-src': src,
            onLoad: removeLoader,
            onError: removeLoader,
          })}
          {...restImgProps}
        />
      </LazyObserver>
    );
  };

  // Renders picture tag with required props
  const renderPicture = () => {
    const sortedSrcSet = sortSrcSet(srcSet);
    const defaultSourceSet = sortedSrcSet.pop();

    return (
      <picture>
        {sortedSrcSet?.map(
          (source) =>
            source?.breakPoint > 0 && (
              <source
                key={`${source.src}_${source.breakPoint}`}
                media={`(max-width: ${source.breakPoint}px)`}
                srcSet={source.src}
                {...(source.type && { type: source.type })}
              />
            )
        )}
        {defaultSourceSet && (
          <source
            media={`(min-width: ${defaultSourceSet.breakPoint ?? 0}px)`}
            srcSet={defaultSourceSet.src}
            {...(defaultSourceSet.type && { type: defaultSourceSet.type })}
          />
        )}
        {renderImage({
          src: defaultSourceSet.src,
          alt: defaultSourceSet.alt,
        })}
      </picture>
    );
  };

  return srcSet && srcSet.length > 0 ? renderPicture() : renderImage();
};

Image.propTypes = {
  alt: string,
  src: string,
  srcSet: arrayOf(
    shape({
      src: string.isRequired,
      breakPoint: number.isRequired,
      type: string,
      alt: string,
    })
  ),
  className: string,
  id: string,
  loading: oneOf(['lazy', 'eager']),
  loaderClassName: string,
};

Image.defaultProps = {
  src: null,
  alt: 'Image',
  srcSet: [],
  className: '',
  id: null,
  loading: 'lazy',
  loaderClassName: '',
};

export default Image;
