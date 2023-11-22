import { Flex, Paper, Stack, Text } from "@mantine/core";
import { Tables, supabaseClient } from "../supabase/supabase";
import { score } from "./heuristic";
import useShakeAnimation from "./hooks.ts/useShake";
import useTimeInSeconds from "./hooks.ts/useTimer";
import "./shake.css";

export const SongBox = ({ zelja }: { zelja: Tables<"zelje"> }) => {
  const { shakeElement, shakeStyle } = useShakeAnimation();
  const timeSec = useTimeInSeconds();

  return (
    <Paper
      withBorder
      shadow="lg"
      radius="md"
      p="md"
      style={{
        ...shakeStyle,
        borderWidth: "2px",
        borderColor: `hsl(${(zelja.id * 131) % 360}, 80%, 80%)`,
      }}
      onClick={() => {
        console.log("klik");
        shakeElement();

        supabaseClient
          .from("zelje")
          .update({ clicks: zelja.clicks + 1 })
          .eq("id", zelja.id)
          .then((res) => {
            if (res.error) {
              console.log("err", res.data);
            }
          });
      }}
    >
      {/* <Text>Paper is the most basic ui component</Text> */}
      <Flex align="center">
        <Flex w="100%" direction="column" justify="space-between">
          <Text lineClamp={3}>
            {zelja.zelja?.includes("http") ? (
              <>
                <a href={zelja.zelja.split(" ")[0]} target="_blank">
                  {zelja.zelja.split(" ")[0]}
                </a>{" "}
                {zelja.zelja.split(" ").slice(1).join(" ")}
              </>
            ) : (
              <>{zelja.zelja}</>
            )}
          </Text>
          <Text size="xs" c="dimmed" py="sm">
            {new Date(zelja.updated_at).toLocaleTimeString()}
          </Text>
        </Flex>
        <Stack align="center">
          <Text size="xl" fw="bolder" variant="gradient" px="xl">
            {zelja.clicks}
          </Text>
          <Text size="xs" opacity={0.1}>
            {Math.round(score(zelja.updated_at, zelja.clicks, timeSec))}
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
};
