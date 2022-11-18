import React, { Fragment } from 'react';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from 'nsw-ds-react/breadcrumbs/breadcrumb'

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();

  let path = {};

  if (location.pathname === '/') {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
      <Breadcrumbs
        label="Breadcrumb for homepage"
        items={[
          {
            link: '#',
            text: 'Home'
          },
          {
            link: '#',
            text: 'Safeguard Digital Tools'
          },
          {
            text: 'Activities'
          }
        ]}
    />
    </div>
    );
  }

  if (
    location.pathname === '/residential-ac-estimator' ||
    location.pathname === '/commercial-ac-estimator' ||
    location.pathname === '/refrigerated-cabinet-estimator' ||
    location.pathname === '/pool-pumps-estimator' ||
    location.pathname === '/commercial-motors-estimator' ||
    location.pathname === '/residential-refrigerators-estimator' ||
    location.pathname === '/commercial-wh-estimator'
  ) {
    return (
      <div className="nsw-container" style={{ marginBottom: 20 }}>
      <Breadcrumbs
        label="Breadcrumb for certificates"
        items={[
          {
            link: '/',
            text: 'Home'
          },
          {
            link: '#',
            text: 'Safeguard Digital Tools'
          },
          {
            link: '/',
            text: 'Activities'
          },
          {
            text: 'Certificate Estimator'
          }
        ]}
    />
    </div>
    );
  }

  return null;
}
