import "pepsico-ds/css";
import {pepsicoFullLogoProps} from "pepsico-ds";
import {Header,NotificationMenu,Icon,ProfileMenu,Avatar} from "pepsico-ds";

function HeaderSignIn()
{
    return(
      
    <Header appLogoProps={{
    appName: 'App Name',
    colorStyle: 'white',
    logoType: 'appLogo'
  }}
  
  pepsicoFullLogoProps={{
    className: 'pepsico-logo',
    colorStyle: 'white',
    logoType: 'pepsicoFullLogo'
  }}
  />
    );
}

export default HeaderSignIn;


