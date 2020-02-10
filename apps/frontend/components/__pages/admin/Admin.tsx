import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonLink from '../../ButtonLink/ButtonLink';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../../Header/Header';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { googleCloud } from '@myiworlds/credentials';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../../../contexts/User/UserContext';

const useStyles = makeStyles({
  root: {
    maxWidth: 425,
  },
});

const servicesUsed = [
  {
    name: 'Google Cloud Dashboard',
    url: `https://console.cloud.google.com/home/dashboard?organizationId=${googleCloud.organizationId}&project=${googleCloud.project}`,
    icon:
      'https://www.cengn.ca/wp-content/uploads/2019/09/GCP_Twitter_Card-2000%C3%971000-1170x780.png"',
  },
  {
    name: 'Firebase Dashboard',
    url: `https://console.firebase.google.com/u/0/project/${googleCloud.project}/overview?pli=1`,
    icon:
      'https://cdn.dribbble.com/users/528264/screenshots/3140440/firebase_logo.png',
  },
  {
    name: 'Firestore',
    url: `https://console.firebase.google.com/u/0/project/${googleCloud.project}/database/firestore`,
    icon:
      'https://iosdevremi.com/wp-content/uploads/2019/04/Cloud-Firestore-Independent-Icon-copie.png',
  },
  {
    name: 'Authentication',
    url: `https://console.firebase.google.com/u/0/project/${googleCloud.project}/authentication/users`,
    icon:
      'https://smellyc0de.files.wordpress.com/2018/03/firebase-authentication-vert-light.png?w=401&h=301',
  },
  {
    name: 'Functions',
    url: `https://console.cloud.google.com/security/secret-manager?project=${googleCloud.project}`,
    icon:
      'https://www.gcppodcast.com//images/icons/compute/Cloud-Functions.png',
  },
  {
    name: 'Hosting',
    url: `https://console.firebase.google.com/u/0/project/${googleCloud.project}/hosting`,
    icon: 'https://img.stackshare.io/service/6688/m3cEA33V_400x400.jpg',
  },
];

const Admin = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  if (!user.isSystemAdmin) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h2">
          You must be a System Admin to access this.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Header title="System Admin" />
      <Grid container spacing={3}>
        <Grid item sm={4}>
          <Card className={classes.root}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://cdn.iview.abc.net.au/thumbs/1200/ck/CK1714V_59a4b949bbec1_1280.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Application Setup
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Here it gives you the initial steps to creating this environment
                for your application
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                component={ButtonLink}
                href="/admin/application-setup"
              >
                Setup
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item sm={4}>
          <Card>
            <CardHeader title="Services Used Shortcuts" />
            <CardContent>
              <List className={classes.root}>
                {servicesUsed.map(service => (
                  <ListItem
                    button
                    component="a"
                    target="_blank"
                    href={service.url}
                    key={service.name}
                  >
                    <ListItemAvatar>
                      <Avatar src={service.icon} />
                    </ListItemAvatar>
                    <ListItemText primary={service.name} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
