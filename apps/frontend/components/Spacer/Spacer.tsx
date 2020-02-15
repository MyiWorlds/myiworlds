import * as React from 'react';

interface Props {
  height?: number;
  multiplier?: number;
}

const Spacer: React.FunctionComponent<Props> = ({ height, multiplier }) => {
  const style = {
    width: '100%',
    height: 24,
    margin: 0,
  };

  if (height) {
    style.height = height;
  }

  if (multiplier) {
    style.height = style.height * multiplier;
  }
  return <div style={style} />;
};

export default Spacer;
