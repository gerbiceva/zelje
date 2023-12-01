import { Flex, Paper, Stack, Text } from "@mantine/core";
import { Tables } from "../supabase/supabase";
import "./shake.css";

export const SongBox = ({ karaoke }: { karaoke: Tables<"karaoke"> }) => {

  return (
    <Paper
      withBorder
      shadow="lg"
      radius="md"
      p="md"
      style={{
        borderWidth: "2px",
        borderColor: `hsl(${(karaoke.id * 131) % 360}, 80%, 80%)`,
      }}
    >
      <Flex align="center">
        <Flex w="100%" direction="column" justify="space-between">
          <Text lineClamp={3}>
            {karaoke.komad?.includes("http") ? (
              <>
                {karaoke.imepriimek} - 
                <a href={karaoke.komad.split(" ")[0]} target="_blank">
                  {karaoke.komad.split(" ")[0]}
                </a>{" "}
                {karaoke.komad.split(" ").slice(1).join(" ")}
              </>
            ) : (
              <>{karaoke.imepriimek} - {karaoke.komad}</>
            )}
          </Text>
          <Text size="xs" c="dimmed" py="sm">
            {new Date(karaoke.created_at).toLocaleString()}
          </Text>
        </Flex>
        <Stack align="center">
          {/* TODO: pofixaj barvo */}
          <Text size="xl" fw="bolder" variant="gradient" px="xl" c={`hsl(${(karaoke.id * 131) % 360}, 80%, 80%)`}>
            {karaoke.id}
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
};
