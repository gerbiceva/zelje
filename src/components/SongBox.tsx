import { Flex, Paper, Text, Tooltip } from "@mantine/core";
import { Tables, supabaseClient } from "../supabase/supabase";

export const SongBox = ({ zelja }: { zelja: Tables<"zelje"> }) => {
  return (
    <Paper
      shadow="lg"
      radius="md"
      p="md"
      onClick={() => {
        console.log("klik");

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
          <Text lineClamp={3}>{zelja.zelja}</Text>
          <Text size="xs" c="dimmed" py="sm">
            {new Date(zelja.created_at).toLocaleTimeString()}
          </Text>
        </Flex>
        <Tooltip label={"Stevilo klikov"}>
          <Text size="xl" fw="bolder" variant="gradient" px="xl">
            {zelja.clicks}
          </Text>
        </Tooltip>
      </Flex>
    </Paper>
  );
};
