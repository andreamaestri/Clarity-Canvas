import { memo } from 'react';
import { RiPagesLine } from 'react-icons/ri';
import ToolButton from '../common/ToolButton';

const PageScroller = memo(() => (
  <ToolButton
    label="Page Scroller"
    icon={RiPagesLine}
    onPress={() => console.log('Open page scroller')}
    tooltipPosition="top"
  />
));

PageScroller.displayName = 'PageScroller';

export default PageScroller;