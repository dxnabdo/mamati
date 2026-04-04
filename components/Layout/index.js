// استيراد جميع المكونات
import TopNewsBar from './TopNewsBar';
import MainHeader from './MainHeader';
import CategoriesScroll from './CategoriesScroll';
import BottomBar from './BottomBar';

// تصدير كل مكون على حدة
export { default as TopNewsBar } from './TopNewsBar';
export { default as MainHeader } from './MainHeader';
export { default as CategoriesScroll } from './CategoriesScroll';
export { default as BottomBar } from './BottomBar';

// تصدير كحزمة واحدة
const Layout = {
  TopNewsBar,
  MainHeader,
  CategoriesScroll,
  BottomBar,
};

export default Layout;