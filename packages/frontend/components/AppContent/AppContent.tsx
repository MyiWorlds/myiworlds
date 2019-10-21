import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

interface Props {
  children: React.ReactElement;
}

const AppContent: React.SFC<Props> = ({ children }) => {
  return (
    <Container>
      <Box my={2}>{children}</Box>
    </Container>
  );
};

export default AppContent;
