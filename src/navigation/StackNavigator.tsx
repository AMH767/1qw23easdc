import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import {screens} from '../screens';
import {components} from '../components';
import {TabNavigator} from './TabNavigator';

const stack = createBrowserRouter([
  {
    path: '/',
    element: <screens.Onboarding />,
  },
  {
    path: '/sign-in',
    element: <screens.SignIn />,
  },
  {
    path: '/profile/edit',
    element: <screens.ProfileEdit />,
  },
  {
    path: '/forgot-password',
    element: <screens.ForgotPassword />,
  },
  {
    path: '/profile/privacy-policy',
    element: <screens.PrivacyPolicy />,
  },
  {
    path: '/profile/my-wishlist',
    element: <screens.MyWishlist />,
  },
  {
    path: '/sign-up',
    element: <screens.SignUp />,
  },
  {
    path: '/verify-your-phone-number',
    element: <screens.VerifyYourPhoneNumber />,
  },
  {
    path: '/choose-payment-method',
    element: <screens.ChoosePaymentMethod />,
  },
  {
    path: '/course-details',
    element: <screens.CourseDetails />,
  },
  {
    path: '/confirmation-code',
    element: <screens.ConfirmationCode />,
  },
  {
    path: '/profile/help-and-support',
    element: <screens.HelpAndSupport />,
  },
  {
    path: '/new-password',
    element: <screens.NewPassword />,
  },
  {
    path: '/forgot-password-sent-email',
    element: <screens.ForgotPasswordSentEmail />,
  },
  {
    path: '/payment-success',
    element: <screens.PaymentSuccess />,
  },
  {
    path: '/profile/edit',
    element: <screens.ProfileEdit />,
  },
  {
    path: '/profile/my-coupons',
    element: <screens.MyCoupons />,
  },
  {
    path: '/account-created',
    element: <screens.SignUpAccountCreated />,
  },
  {
    path: '/category-grid',
    element: <screens.CategoryGrid />,
  },
  {
    path: '/leave-a-review',
    element: <screens.LeaveAReview />,
  },
  {
    path: '/add-a-new-card',
    element: <screens.AddANewCard />,
  },
  {
    path: '/course-completed-certificate',
    element: <screens.CourseCompletedCertificate />,
  },
  {
    path: '/checkout',
    element: <screens.Checkout />,
  },
  {
    path: '/filter',
    element: <screens.Filter />,
  },
  {
    path: '/profile/my-wallet',
    element: <screens.MyWallet />,
  },
  {
    path: '/course-completed',
    element: <screens.CourseCompleted />,
  },
  {
    path: '/category-list',
    element: <screens.CategoryList />,
  },
  {
    path: '/payment-failed',
    element: <screens.PaymentFailed />,
  },
  {
    path: '/tab-navigator',
    element: <TabNavigator />,
  },
]);

export const StackNavigator: React.FC = () => {
  return <RouterProvider router={stack} />;
};
