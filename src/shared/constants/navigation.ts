import {
  MdFormatListBulleted,
  MdAddCircleOutline,
  MdPerson,
  MdInsertChartOutlined,
} from 'react-icons/md';

export const NAV_ITEMS = [
  { path: '/routines', label: '루틴 목록', icon: MdFormatListBulleted },
  { path: '/routines/new', label: '새 루틴', icon: MdAddCircleOutline },
  { path: '/dashboard', label: '통계', icon: MdInsertChartOutlined },
  { path: '/profile', label: '프로필', icon: MdPerson },
];
