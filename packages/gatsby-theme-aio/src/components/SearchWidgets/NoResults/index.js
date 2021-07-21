import React from 'react';
import { connectStateResults, ClearRefinements } from 'react-instantsearch-dom';

// TODO: Remove these stylesheets when styling everything with Spectrum
import 'instantsearch.css/themes/satellite.css';
import '../../SearchPage/index.css';

const NoResults = ({ searchResults }) => {
  if (!searchResults || searchResults.nbHits > 0) {
    return null;
  }

  const hasRefinements = searchResults.getRefinements().length > 0;
  const description = hasRefinements ? 'Try to reset your applied filters.' : 'Please try another query.';

  // TODO: Use https://opensource.adobe.com/spectrum-css/illustratedmessage.html but incorporate the ClearRefinements component below.

  return (
    <div className="hits-empty-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="138"
        height="138"
        className="hits-empty-state-image">
        <defs>
          <linearGradient id="c" x1="50%" x2="50%" y1="100%" y2="0%">
            <stop offset="0%" stopColor="#F5F5FA" />
            <stop offset="100%" stopColor="#FFF" />
          </linearGradient>
          <path id="b" d="M68.71 114.25a45.54 45.54 0 1 1 0-91.08 45.54 45.54 0 0 1 0 91.08z" />
          <filter id="a" width="140.6%" height="140.6%" x="-20.3%" y="-15.9%" filterUnits="objectBoundingBox">
            <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5.5" />
            <feColorMatrix
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
              values="0 0 0 0 0.145098039 0 0 0 0 0.17254902 0 0 0 0 0.380392157 0 0 0 0.15 0"
            />
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter2" />
            <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="1.5" />
            <feColorMatrix
              in="shadowBlurOuter2"
              result="shadowMatrixOuter2"
              values="0 0 0 0 0.364705882 0 0 0 0 0.392156863 0 0 0 0 0.580392157 0 0 0 0.2 0"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="shadowMatrixOuter2" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" fillRule="evenodd">
          <circle cx="68.85" cy="68.85" r="68.85" fill="#5468FF" opacity=".07" />
          <circle cx="68.85" cy="68.85" r="52.95" fill="#5468FF" opacity=".08" />
          <use fill="#000" filter="url(#a)" xlinkHref="#b" />
          <use fill="url(#c)" xlinkHref="#b" />
          <path
            d="M76.01 75.44c5-5 5.03-13.06.07-18.01a12.73 12.73 0 0 0-18 .07c-5 4.99-5.03 13.05-.07 18a12.73 12.73 0 0 0 18-.06zm2.5 2.5a16.28 16.28 0 0 1-23.02.09A16.29 16.29 0 0 1 55.57 55a16.28 16.28 0 0 1 23.03-.1 16.28 16.28 0 0 1-.08 23.04zm1.08-1.08l-2.15 2.16 8.6 8.6 2.16-2.15-8.6-8.6z"
            fill="#5369FF"
          />
        </g>
      </svg>

      <p className="hits-empty-state-title">Sorry, we can&apos;t find any matches to your query!</p>
      <p className="hits-empty-state-description">{description}</p>

      <ClearRefinements
        translations={{
          reset: (
            <div className="clear-filters">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11">
                <g fill="none" fillRule="evenodd">
                  <path d="M0 0h11v11H0z" />
                  <path
                    fill="#000"
                    fillRule="nonzero"
                    d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                  />
                </g>
              </svg>
              Clear filters
            </div>
          )
        }}
      />
    </div>
    //TODO: Replace above with below

    // <div className="spectrum-IllustratedMessage">
    //   <svg className="spectrum-IllustratedMessage-illustration" xmlns="http://www.w3.org/2000/svg" width="200" height="98"
    //        viewBox="0 0 199 97.7">
    //     <defs>
    //       <style>.cls-1,.cls-2{fill:none;stroke-linecap:round;stroke-linejoin:round;}.cls-1{stroke - width:3px;}.cls-2{stroke - width:2px;}</style>
    //     </defs>
    //     <title>Asset 1</title>
    //     <g id="Layer_2" data-name="Layer 2">
    //       <g id="illustrations">
    //         <path className="cls-1" d="M110.53,85.66,100.26,95.89a1.09,1.09,0,0,1-1.52,0L88.47,85.66" />
    //         <line className="cls-1" x1="99.5" y1="95.5" x2="99.5" y2="58.5" />
    //         <path className="cls-1" d="M105.5,73.5h19a2,2,0,0,0,2-2v-43" />
    //         <path className="cls-1" d="M126.5,22.5h-19a2,2,0,0,1-2-2V1.5h-31a2,2,0,0,0-2,2v68a2,2,0,0,0,2,2h19" />
    //         <line className="cls-1" x1="105.5" y1="1.5" x2="126.5" y2="22.5" />
    //         <path className="cls-2" d="M47.93,50.49a5,5,0,1,0-4.83-5A4.93,4.93,0,0,0,47.93,50.49Z" />
    //         <path className="cls-2" d="M36.6,65.93,42.05,60A2.06,2.06,0,0,1,45,60l12.68,13.2" />
    //         <path className="cls-2" d="M3.14,73.23,22.42,53.76a1.65,1.65,0,0,1,2.38,0l19.05,19.7" />
    //         <path className="cls-1"
    //               d="M139.5,36.5H196A1.49,1.49,0,0,1,197.5,38V72A1.49,1.49,0,0,1,196,73.5H141A1.49,1.49,0,0,1,139.5,72V32A1.49,1.49,0,0,1,141,30.5H154a2.43,2.43,0,0,1,1.67.66l6,5.66" />
    //         <rect className="cls-1" x="1.5" y="34.5" width="58" height="39" rx="2" ry="2" />
    //       </g>
    //     </g>
    //   </svg>
    //   <h2
    //     className="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light spectrum-IllustratedMessage-heading">Error
    //     404: Page Not Found</h2>
    //   <p className="spectrum-Body spectrum-Body--sizeS spectrum-IllustratedMessage-description">This page isn't available.
    //     Try checking the URL or visit a different page.</p>
    // </div>
  );
};

export default connectStateResults(NoResults);
