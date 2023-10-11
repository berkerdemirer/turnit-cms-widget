import React, { FC, useState } from "react";
import classes from "./LanguagePicker.module.css";
import { Group, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { CircleFlag } from "react-circle-flags";

interface LanguagePickerProps {}

export const LanguagePicker: FC<LanguagePickerProps> = () => {
  const { i18n } = useTranslation();
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState("en");
  const items = [
    <Menu.Item
      leftSection={<CircleFlag className={classes.flag} countryCode="gb" />}
      onClick={() => {
        setSelected("en");
        i18n.changeLanguage("en");
      }}
      key={"en"}
    >
      EN
    </Menu.Item>,
    <Menu.Item
      leftSection={<CircleFlag className={classes.flag} countryCode="ee" />}
      onClick={() => {
        setSelected("ee");
        i18n.changeLanguage("et-EE");
      }}
      key={"et-ee"}
    >
      EE
    </Menu.Item>,
  ];

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classes.control}
          data-expanded={opened || undefined}
        >
          <Group gap="xs">
            {selected === "en" ? (
              <CircleFlag className={classes.flag} countryCode="gb" />
            ) : (
              <CircleFlag className={classes.flag} countryCode="ee" />
            )}
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
};
