import { NavLink as Link } from "react-router-dom";
import { styled } from "styled-components";

export const Nav = styled.nav`
    border-radius: 8px;
    border: 1px solid transparent;
    background: #d9975c;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 2rem;
    z-index: 12;
`;
export const NavLogo = styled(Link)`
  align-self: left;
  cursor: pointer;
  color: #fff;
  text-decoration: none;
  opacity: 0.9;
  transition: 0.3s;
  &:hover {
    opacity: 1.0
  }

`;

export const NavLink = styled(Link)`
    color: #fff;
    font-size: 1.2rem;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    opacity: 0.9;
    transition: 0.3s;
    &:hover {
     opacity: 1.0
    }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
