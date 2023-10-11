import React, { FC, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  rem,
  ScrollArea,
} from "@mantine/core";
import classes from "./Header.module.css";
import { LanguagePicker } from "@/components/LanguagePicker/LanguagePicker";
import { Link } from "react-router-dom";

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

const Header: FC<HeaderSearchProps> = ({ links }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      to={link.link}
      key={link.label}
      className={classes.link}
      onClick={() => {
        setActive(link.link);
        close();
      }}
      data-active={active === link.link || undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <div>logo</div>
          <Group h="100%" gap={0} visibleFrom="sm">
            {items}
            <LanguagePicker />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {items}
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Header;
