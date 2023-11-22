import {
  ActionIcon,
  Alert,
  LoadingOverlay,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconTrashX } from "@tabler/icons-react";
import { supabaseClient } from "../../supabase/supabase";
import { useLiveSongList } from "../../components/hooks.ts/songListHook";

export function ZeljeodFolk() {
  const { err, isLoading, zelje, removeZelje } = useLiveSongList();

  const deleteZelja = (id: number) => {
    console.log(id);
    supabaseClient
      .from("zelje")
      .delete()
      .eq("id", id)
      .then(() => {
        removeZelje(id);
      });
  };

  const zeelje = zelje
    .sort((a, b) => b.clicks - a.clicks)
    .map((zelja) => (
      <Table.Tr key={zelja.id}>
        <Table.Td>
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
        </Table.Td>
        <Table.Td>{zelja.clicks}</Table.Td>
        <Table.Td>{new Date(zelja.created_at).toLocaleTimeString()}</Table.Td>
        <Table.Td>
          <ActionIcon variant="subtle" onClick={() => deleteZelja(zelja.id)}>
            <IconTrashX />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Stack p="lg" pos="relative">
      <Title>Pa valda nebomo to poslusali?</Title>
      {err != undefined ? (
        <Alert color="red" icon={<IconAlertCircle></IconAlertCircle>}>
          {err.message}
        </Alert>
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Komad</Table.Th>
              <Table.Th>Count</Table.Th>
              <Table.Th>Time</Table.Th>
              <Table.Th>Zbriz</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{zeelje}</Table.Tbody>
        </Table>
      )}
      <LoadingOverlay visible={isLoading} />
    </Stack>
  );
}
