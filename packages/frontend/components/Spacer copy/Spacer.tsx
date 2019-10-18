import * as React from 'react';

interface Props {
  height?: number;
}

const Spacer: React.SFC<Props> = ({ height }) => {
  return <div style={{ width: '100%', height: height || 24 }} />;
};

export default Spacer;
