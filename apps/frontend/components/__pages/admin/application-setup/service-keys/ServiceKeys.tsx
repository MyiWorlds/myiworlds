import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import CreateSecurityKey from './CreateSecurityKey';
import Header from '../../../../Header/Header';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import Spacer from '../../../../Spacer/Spacer';
import ViewListIcon from '@material-ui/icons/ViewList';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { googleCloud } from '@myiworlds/credentials';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const Credentials: React.FunctionComponent<Props> = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Header title="Create Service Keys for this Environment" />
      <CreateSecurityKey />
      <Spacer />
      <Card>
        <CardHeader title="Helpful Links" />
        <CardContent>
          <Card>
            <List className={classes.root}>
              <ListItem
                button
                component="a"
                target="_blank"
                href={`https://console.cloud.google.com/iam-admin/serviceaccounts/create?organizationId=${googleCloud.organizationId}&orgonly=true&project=${googleCloud.project}&supportedpurview=organizationId`}
              >
                <ListItemAvatar>
                  <Avatar>
                    <VpnKeyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Create Service Key in Google Cloud"
                  secondary="Create custom service account keys for other tasks"
                />
              </ListItem>
              <ListItem
                button
                component="a"
                target="_blank"
                href={`https://console.cloud.google.com/security/secret-manager?project=${googleCloud.project}`}
              >
                <ListItemAvatar>
                  <Avatar>
                    <ViewListIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="View all service accounts in Google Cloud"
                  secondary="Manage your service keys for this application"
                />
              </ListItem>
            </List>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Credentials;
