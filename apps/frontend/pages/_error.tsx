import Container from '@material-ui/core/Container';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const Error = ({ statusCode }: { statusCode: number }) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1">That sucks, I just had an error.</Typography>
      <Typography variant="body1">
        I will let someone know about this issue to help prevent it in the
        future. Try refreshing the page or try doing what you did again.
      </Typography>
      <Typography variant="body1">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </Typography>
    </Container>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
