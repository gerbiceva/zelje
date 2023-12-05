import { Box, Flex, Paper, Stack, Text } from "@mantine/core";
import { Tables, supabaseClient } from "../supabase/supabase";
import useShakeAnimation from "./hooks.ts/useShake";
import "./novcssfile.css";
import "./shake.css";
import "./wiggle.css";

import useWiggleAnimation from "./hooks.ts/useWiggle";

export const SongBox = ({
  karaoke,
}: {
  karaoke: Tables<"karaoke">;
  i: number;
}) => {
  const { shakeElement, shakeStyle } = useShakeAnimation();
  const { wiggleStyle } = useWiggleAnimation();

  return (
    <Box
      className="prevent-select"
      style={{
        ...shakeStyle,
        ...wiggleStyle,
      }}
    >
      <Box
        mb="-1rem"
        ml="-0.5rem"
        style={{
          zIndex: 100,
        }}
      >
        <Text size="2rem">🎉</Text>
      </Box>
      <Paper
        withBorder
        shadow="lg"
        radius="md"
        p="md"
        style={{
          borderWidth: "2px",
          borderColor: `hsl(${(karaoke.id * 131) % 360}, 80%, 70%)`,
        }}
        onClick={() => {
          console.log("klik");
          shakeElement();

          supabaseClient
            .from("karaoke")
            .update({ likes: karaoke.likes + 1 })
            .eq("id", karaoke.id)
            .then((res) => {
              if (res.error) {
                console.log("err", res.data);
              }
            });
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
                <>
                  {karaoke.imepriimek} - {karaoke.komad}
                </>
              )}
            </Text>
            <Text size="xs" c="dimmed" pt="sm">
              {new Date(karaoke.created_at).toLocaleString()}
            </Text>
          </Flex>
          <Stack align="center">
            <Text
              size="xl"
              fw="bolder"
              variant="text"
              px="xl"
              c={`hsl(${(karaoke.id * 131) % 360}, 50%, 40%)`}
            >
              {karaoke.likes}
            </Text>
          </Stack>
        </Flex>
      </Paper>
    </Box>
  );
};
