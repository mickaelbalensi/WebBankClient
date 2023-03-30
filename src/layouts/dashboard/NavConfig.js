// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'My account',
    path: '/dashboard/myaccount',
    icon: getIcon('ic:baseline-account-balance'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'loans',
    path: '/dashboard/loans',
    icon: getIcon('bx:transfer-alt'),
  },
  {
    title: 'transfer',
    path: '/dashboard/transfer',
    icon: getIcon('fa6-solid:money-bill-trend-up'),
  },
  {
    title: 'borrow',
    path: '/dashboard/borrow',
    icon: getIcon('fa-solid:hand-holding-usd'),
  },
  {
    title: 'transactions',
    path: '/dashboard/mytransactions',
    icon: getIcon('mdi:bank-transfer'),
  },

  
];

export default navConfig;
