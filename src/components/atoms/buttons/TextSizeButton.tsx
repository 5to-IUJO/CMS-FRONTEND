import { useState } from 'react';
import {  Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const TextSizeButton = ({ setSize }: {setSize:Function}) => {
  const [selectedSize, setSelectedSize] = useState('16');

  const handleSizeChange = (size:string) => {
    setSize(size);
    setSelectedSize(size);
  };

  const sizes = ['12', '14', '16', '18', '20', '24'];

  return (
    <Menu>
      <MenuButton as={Button} minW={"50px"}  iconSpacing={"5"} rightIcon={<ChevronDownIcon />}>
        {selectedSize}
      </MenuButton>
      <MenuList>
        {sizes.map((size) => (
          <MenuItem key={size} onClick={() => handleSizeChange(size)}>
            {size}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

