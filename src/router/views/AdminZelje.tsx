import {
  ActionIcon,
  Alert,
  Divider,
  LoadingOverlay,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconEyeCancel, IconTrash } from "@tabler/icons-react";
import { useMemo } from "react";
import { useLiveKaraokeList } from "../../components/hooks.ts/karaokeListHook";
import { supabaseClient } from "../../supabase/supabase";

export function ZeljeodFolk() {
  const { err, isLoading, karaoke, updateKaraoke } = useLiveKaraokeList();

  const hideKaraoko = (id: number) => {
    supabaseClient
      .from("karaoke")
      .update({hidden: true})
      .eq("id", id)
      .then(() => {
        updateKaraoke();
      })
  };

  const deleteKaraoko = (id: number) => {
    supabaseClient
      .from("karaoke")
      .delete()
      .eq("id", id)
      .then(() => {
        updateKaraoke();
      })
  };

  const sortedKaraoke = useMemo(() => {
    return karaoke.filter((kar) => {
      return !kar.hidden;
    }).sort((a, b) => {
      return a.id - b.id;
    });
  }, [karaoke]);

  const sortedKaraokeOdpete = useMemo(() => {
    return karaoke.filter((kar) => {
      return kar.hidden;
    }).sort((a, b) => {
      return a.id - b.id;
    });
  }, [karaoke]);

  const karaokeee = sortedKaraoke.map((kar) => (
    <Table.Tr key={kar.id}>
      <Table.Td>{kar.id}.</Table.Td>
      <Table.Td>{kar.imepriimek}</Table.Td>
      <Table.Td>
        {kar.komad?.includes("http") ? (
          <>
            <a href={kar.komad.split(" ")[0]} target="_blank">
              {kar.komad.split(" ")[0]}
            </a>{" "}
            {kar.komad.split(" ").slice(1).join(" ")}
          </>
        ) : (
          <>{kar.komad}</>
        )}
      </Table.Td>
      <Table.Td>{new Date(kar.created_at).toLocaleString()}</Table.Td>
      <Table.Td>
        <ActionIcon variant="subtle" onClick={() => hideKaraoko(kar.id)}>
          <IconEyeCancel />
        </ActionIcon>
      </Table.Td>
      <Table.Td>
        <ActionIcon variant="subtle" onClick={() => deleteKaraoko(kar.id)}>
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  const karaokeeeOdpete = sortedKaraokeOdpete.map((kar) => (
    <Table.Tr key={kar.id}>
      <Table.Td>{kar.id}.</Table.Td>
      <Table.Td>{kar.imepriimek}</Table.Td>
      <Table.Td>
        {kar.komad?.includes("http") ? (
          <>
            <a href={kar.komad.split(" ")[0]} target="_blank">
              {kar.komad.split(" ")[0]}
            </a>{" "}
            {kar.komad.split(" ").slice(1).join(" ")}
          </>
        ) : (
          <>{kar.komad}</>
        )}
      </Table.Td>
      <Table.Td>{new Date(kar.created_at).toLocaleString()}</Table.Td>
      <Table.Td>
        <ActionIcon variant="subtle" onClick={() => deleteKaraoko(kar.id)}>
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack p="lg" pos="relative">
      <Title>Pa valda nebomo to peli?</Title>
      {err != undefined ? (
        <Alert color="red" icon={<IconAlertCircle></IconAlertCircle>}>
          {err.message}
        </Alert>
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Zap. št.</Table.Th>
              <Table.Th>Ime priimek</Table.Th>
              <Table.Th>Komad</Table.Th>
              <Table.Th>Čas prijave</Table.Th>
              <Table.Th>Odpeto</Table.Th>
              <Table.Th>Zbriši</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{karaokeee}</Table.Tbody>
        </Table>
      )}
      <LoadingOverlay visible={isLoading} />

      <Title mt={50}>Tole smo pa že odpeli...</Title>

      {err != undefined ? (
        <Alert color="red" icon={<IconAlertCircle></IconAlertCircle>}>
          {err.message}
        </Alert>
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Zap. št.</Table.Th>
              <Table.Th>Ime priimek</Table.Th>
              <Table.Th>Komad</Table.Th>
              <Table.Th>Čas prijave</Table.Th>
              <Table.Th>Zbriši</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{karaokeeeOdpete}</Table.Tbody>
        </Table>
      )}
    </Stack>
  );
}
