import { useState } from 'react';
import {  Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const TextSizeButton = ({ setSize }: {setSize:Function}) => {
  const [selectedSize, setSelectedSize] = useState('16px');

  const handleSizeChange = (size:string) => {
    setSize(size);
    setSelectedSize(size);
  };

  const sizes = ['12px', '14px', '16px', '18px', '20px', '24px'];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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

