import 'antd/dist/antd.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // the
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.scss';
import '../styles/customAntd.scss';

import AppLayout from '@App/AppLayout';
import { store } from '@Store/Store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Script from 'next/script';
import { oneOfType, string, node, object } from 'prop-types';

import ENV_CONFIG from '../../env.config.js';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={ENV_CONFIG.GOOGLE_CLIENT_ID}>
        <AppLayout>
          <Component {...pageProps} />

          {/* <Script
            src="https://apis.mapmyindia.com/advancedmaps/v1/89571cb15bde944f2a375e214e0e1065/map_load?v=1.5"
            strategy="lazyOnload"
          /> */}
          <Script
            src="https://apis.mappls.com/advancedmaps/api/6c4a08694556e68099c1bc557cdca5e8/map_sdk?layer=vector&v=3.0"
            defer
            async
          />
          <script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDrEyii2l-JMtTbkD_AOD-fhYIWDNz9gEQ&sensor=false&callback=initializeMap&libraries=places&region=IN"
          ></script>
        </AppLayout>
      </GoogleOAuthProvider>
    </Provider>
  );
}

// ReactDOM.render(
//   <Provider store={store}>
//   <GoogleOAuthProvider clientId={ENV_CONFIG.GOOGLE_CLIENT_ID}>
//     <AppLayout>
//       <Component {...pageProps} />

//       <Script
//         src="https://apis.mapmyindia.com/advancedmaps/v1/89571cb15bde944f2a375e214e0e1065/map_load?v=1.5"
//         strategy="lazyOnload"
//       />
//       <script
//         type="text/javascript"
//         src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDrEyii2l-JMtTbkD_AOD-fhYIWDNz9gEQ&sensor=false&callback=initializeMap&libraries=places&region=IN"
//       ></script>
//     </AppLayout>
//   </GoogleOAuthProvider>
// </Provider>,
//   document.getElementById('root')
// )

MyApp.propTypes = {
  Component: oneOfType([string, node]).isRequired,
  pageProps: object,
};

export default MyApp;
