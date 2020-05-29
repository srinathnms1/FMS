import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ILink } from '../models/App';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const LinksComponent = ({ links }: { links: ILink[] }) => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            drawerContainer: {
                overflow: 'auto',
            }
        }),
    );

    const classes = useStyles();

    const buildMenu = (menu: ILink[]) => {
        return menu
            .map((link: ILink) => {
                return (
                    <ListItem button={true} key={link.name} component={NavLink} to={link.to} exact={true}>
                        <ListItemIcon><InboxIcon /> </ListItemIcon>
                        <ListItemText primary={link.name} />
                    </ListItem>
                );
            });
    };

    return (
        <div className={classes.drawerContainer}>
            <List>
                {buildMenu(links)}
            </List>
        </div>
    );
};

export default LinksComponent;
