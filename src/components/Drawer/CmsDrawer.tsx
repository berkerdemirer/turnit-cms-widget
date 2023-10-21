import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  ActionIcon,
  Drawer,
  Grid,
  LoadingOverlay,
  rem,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconChevronRight,
  IconQuestionMark,
  IconSearch,
} from "@tabler/icons-react";
import classes from "./CmsDrawer.module.css";
import { useFetchArticles, useFetchUrlPaths } from "@/api/articles/queries";
import { RichText } from "@/components/RichText";
import { useEffect, useState } from "react";

const CmsDrawer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetailsOpened, setIsDetailsOpened] = useState(false);
  const [selectedDocsForDetails, setSelectedDocsForDetails] = useState<{
    title: string;
    content: any;
  }>();
  const [opened, { open, close }] = useDisclosure(false);
  const [defaultLanguage] = useLocalStorage({ key: "language" });
  const urlPaths = useFetchUrlPaths();
  let currentUrl = -1;
  if (urlPaths.isSuccess) {
    currentUrl =
      urlPaths.data?.docs.find((path) => path.urlPath === window.location.href)
        ?.id ?? -1;
  }

  const {
    data: articlesData,
    refetch,
    isLoading,
  } = useFetchArticles(
    searchTerm ? undefined : currentUrl,
    defaultLanguage,
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: true,
    },
    searchTerm,
  );

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <>
            {isDetailsOpened ? (
              <div
                onClick={() => {
                  setIsDetailsOpened(false);
                }}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  display: "inline-flex",
                }}
              >
                <div style={{ marginRight: "8px" }}>
                  <IconArrowLeft size={16} />
                </div>
                <div>Back to Quick Help</div>
              </div>
            ) : (
              "Quick Help"
            )}
          </>
        }
        position={"right"}
        withOverlay={false}
        classNames={{
          inner: classes.inner,
          body: classes.body,
          header: classes.title,
        }}
        size={400}
      >
        <>
          <TextInput
            pr={rem(24)}
            pl={rem(24)}
            leftSection={<IconSearch size={16} />}
            placeholder="Search all articles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {!isDetailsOpened && (
            <Text size="sm" mt={16} mb={4} fw={500} pr={rem(24)} pl={rem(24)}>
              Suggested articles
            </Text>
          )}
          <LoadingOverlay visible={isLoading}></LoadingOverlay>
          {!articlesData?.docs?.length && (
            <Text mt={16} pl={24} pr={24}>
              No articles found for current context or language. You can try
              searching in all articles
            </Text>
          )}

          {isDetailsOpened ? (
            <>
              <Text pl={24} pr={24} pt={16} fw={700} size={"xl"}>
                {selectedDocsForDetails?.title}
              </Text>
              <RichText content={selectedDocsForDetails?.content} />
            </>
          ) : (
            <ul className={classes.articleList}>
              {articlesData?.docs?.map((article: any) =>
                article.content ? (
                  <li
                    className={classes.articleItem}
                    key={article.id}
                    onClick={() => {
                      setIsDetailsOpened(true);
                      setSelectedDocsForDetails(article);
                    }}
                  >
                    <div className={classes.articleContainer}>
                      <div className={classes.articleLink}>{article.title}</div>
                      <div className={classes.articleIcon}>
                        <IconChevronRight size={16} color={"#93949a"} />
                      </div>
                    </div>
                    <div className={classes.separator}></div>
                  </li>
                ) : (
                  <Text mt={16} pl={24} pr={24}>
                    No articles found for current context or language. You can
                    try searching in all articles
                  </Text>
                ),
              )}
            </ul>
          )}
        </>
      </Drawer>

      <ActionIcon
        size="sm"
        color={"gray"}
        variant="outline"
        aria-label="Help"
        radius={"xl"}
        onClick={open}
      >
        <IconQuestionMark style={{ width: "70%", height: "70%" }} />
      </ActionIcon>
    </>
  );
};

export default CmsDrawer;
