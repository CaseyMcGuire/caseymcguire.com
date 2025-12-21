import * as stylex from '@stylexjs/stylex';
import { ChevronRight } from 'lucide-react';

type Props = {
  isOpen: boolean;
};

const styles = stylex.create({
  icon: {
    transitionProperty: 'transform',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    transformOrigin: 'center',
    transform: 'rotate(0deg)',
  },
  open: {
    transform: 'rotate(90deg)',
  },
});

export default function WikiChevronIcon(props: Props) {
  return (
    <div {...stylex.props(styles.icon, props.isOpen && styles.open)}>
      <ChevronRight size={"1.5rem"}
                    color="rgb(81,83,85)"
      />
    </div>
  );
}