import { ActionIcon, Stack, Table, Title } from "@mantine/core";
import { IconTrashX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { supabaseClient } from "../../supabase/supabase";

export function ZeljeodFolk() {
  const [zelje, setZelje] = useState([])

  const channel = supabaseClient
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: "INSERT",
        schema: "public"
      }, (payload) => setZelje([payload.new, ...zelje])
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
      },
      (payload) => {
        setZelje(zelje.filter((zelja) => zelja.id != payload.old.id));
      }
    )
    .subscribe()

  useEffect(() => {
    supabaseClient
      .from('zelje')
      .select()
      .then((data) => { setZelje(data.data) })
  }, [])

  const deleteZelja = (id) => {
    console.log(id)
    const { error } = supabaseClient
      .from('zelje')
      .delete()
      .eq('id', id)
      .then(()=>setZelje(zelje.filter((zelja) => zelja.id != id)));
    ;
  }

  const zeelje = zelje.map(zelja =>
  (<Table.Tr key={zelja.id}>
    <Table.Td>{zelja.zelja}</Table.Td>
    <Table.Td>
      <ActionIcon variant="subtle" onClick={() => deleteZelja(zelja.id)}><IconTrashX /></ActionIcon>
    </Table.Td>
  </Table.Tr>)
  );


  return (
    <Stack p="lg" pos="relative">
      <Title>Pa valda nebomo to poslusali?</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Komad</Table.Th>
            <Table.Th>Zbriz</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{zeelje}</Table.Tbody>
      </Table>
    </Stack>
  );
}