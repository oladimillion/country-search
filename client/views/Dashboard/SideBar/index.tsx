import React from "react";
import { Icon, SemanticICONS } from "semantic-ui-react";
import { FlexBox } from "@oladimillion/react-form";
import { connect } from "./connect";
import {
  Nav,
  HeaderLogo,
  AppName,
  NavScroll,
  Label,
  NavContainer,
  NavItemWrapper,
  StyledNavLink as NavLink,
  LogoutButton,
} from "./styled";
import { INavigationStore } from "../../../stores/types";

type Props = {
  logout(): void;
  navigationStore: INavigationStore;
};

const SideBarView = (props: Props) => {
  const { navigationStore, logout } = props;
  const { navItems, showSideBar } = navigationStore;

  return (
    <Nav showSideBar={showSideBar}>
      <HeaderLogo>
        <AppName to="/">Country Search </AppName>
      </HeaderLogo>
      <NavScroll>
        <NavContainer>
          <NavItemWrapper>
            {navItems.map(({ name, icon, to, ...rest }, index) => (
              <NavItemWrapper.Item key={name}>
                <NavLink to={to} {...rest}>
                  <FlexBox>
                    {icon && <Icon name={icon as SemanticICONS} />}
                    {name && <Label>{name}</Label>}
                  </FlexBox>
                </NavLink>
              </NavItemWrapper.Item>
            ))}
          </NavItemWrapper>
          <LogoutButton onClick={logout}>
            <LogoutButton.Icon />
            Log out
          </LogoutButton>
        </NavContainer>
      </NavScroll>
    </Nav>
  );
};

export const SideBar = connect(SideBarView);
