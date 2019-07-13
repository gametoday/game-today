import React from 'react';
import Downshift from 'downshift';

import {
  Label,
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon,
  css,
  itemToString,
  getItems,
} from './shared'


class AutocompleteWidget extends React.Component {
  constructor(props) {
    super(props);
    this.teamChangedCallback = props.func;
    this.currentTeam = props.currentTeam;
    this.state = {
      menuIsOpen: false
    };
  }

  asdf(e) {
    // onOuterClick={() => this.setState({menuIsOpen: false})}
    debugger
  }
  render() {
    return (
      <div
      {...css({
        display: 'flex',
        flexDirection: 'column',
        marginTop: 50,
      })}
      >
      <Downshift
        onChange={this.teamChangedCallback}
        itemToString={itemToString}
        initialInputValue={this.currentTeam}
        onOuterClick={this.asdf}
      >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        initialSelectedItem,
        getToggleButtonProps,
        clearSelection,
      }) => (
        <div {...css({margin: 'auto'})}>
          <Label {...getLabelProps()}> Game today?</Label>
          <div {...css({position: 'relative'})}>
          <Input {...getInputProps({
            isOpen,
            placeholder: 'Enter a team',
          })} />
        {selectedItem ? (
          <ControllerButton
          onClick={clearSelection}
          aria-label="clear selection"
          >
          <XIcon />
          </ControllerButton>
        ) : (
          <ControllerButton {...getToggleButtonProps()}>
            <ArrowIcon isOpen={isOpen} />
          </ControllerButton>
        )}

        <div {...css({position: 'relative'})}>
        <Menu {...getMenuProps({isOpen})}>
        {isOpen
          ? getItems(inputValue).map((item, index) => (
            <Item
            key={item.id}
            {...getItemProps({
              item,
              index,
              isActive: highlightedIndex === index,
              isSelected: selectedItem === item,
            })}
            >
            {itemToString(item)}
            </Item>
          ))
          : null}
        </Menu>
        </div>
        </div>
        </div>
      )}
      </Downshift>
      </div>
    );
  };
};

export default AutocompleteWidget;
