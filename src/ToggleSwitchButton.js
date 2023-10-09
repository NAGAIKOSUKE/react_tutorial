import React from 'react';
import styled from 'styled-components';

const StyledToggleSwitch = styled.label`
  background-color: #ff9933;
  border-radius: 2em;
  border: 2px solid var(--text-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 2em;
  position: relative;
  transition: .5s;
  width: 3.75em;

  input {
    display: none;

    &:checked ~ & {
      background-color: #003366;
    }

    &:checked ~ span {
      background-color: #003366;
      background-color: #003366;
      &::before {
        left: 2em;
      }
    }
  }

  span::before {
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 100%;
    content: '';
    display: inline-block;
    height: 1.5em;
    position: absolute;
    left: 0.25em;
    transition: .5s ease-out;
    width: 1.5em;
    z-index: 2;
  }
`;

const ToggleSwitchButton = ({ isAscending, onToggle }) => {
  return (
    <StyledToggleSwitch>
      <input
        type="checkbox"
        checked={isAscending}
        onChange={onToggle}
      />
      <span className="toggle-slider"></span>
    </StyledToggleSwitch>
  );
};

export default ToggleSwitchButton;