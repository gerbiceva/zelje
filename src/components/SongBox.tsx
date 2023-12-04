import { Flex, Paper, Stack, Text } from "@mantine/core";
import { Tables } from "../supabase/supabase";
import "./shake.css";

export const SongBox = ({ karaoke, i }: { karaoke: Tables<"karaoke">, i:number}) => {

  return (
    <Paper
      withBorder
      shadow="lg"
      radius="md"
      p="md"
      style={{
        borderWidth: "2px",
        borderColor: `hsl(${(karaoke.id * 131) % 360}, 80%, 70%)`,
      }}
    >
      <Flex align="center">
        <Flex w="100%" direction="column" justify="space-between">
          <Text lineClamp={3} fw={600}>
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
          <Text size="xs" c="dimmed" pt="sm">
            {new Date(karaoke.created_at).toLocaleString()}
          </Text>
        </Flex>
        <Stack align="center">
          <Text size="xl" fw="bolder" variant="text" px="xl" c={`hsl(${(karaoke.id * 131) % 360}, 80%, 70%)`}>
            {i}.
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
};
