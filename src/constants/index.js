import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from '../assets';

//
export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];

// coded background-color as a function of time remaining to deadline
export const backgroundColors = {
  urgent: {
    daysRemaining: 3,
    color: '#ff0000',
  },
  moderate: {
    daysRemaining: 7,
    color: '#0000ff',
  },
  plentytime: {
    daysRemaining: 30,
    color: '#00ff00',
  },
};
