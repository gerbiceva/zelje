import { Alert, Badge, Button, Group, LoadingOverlay, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { openTypedModal } from "../../mantine/modals/modals-utils";
import { notifications } from "@mantine/notifications";
import { spotlight } from "@mantine/spotlight";
import { useStore } from "@nanostores/react";
import { $currUser } from "../../global-state/user";
import { supabaseClient } from "../../supabase/supabase";
import { useForm } from "@mantine/form";
import { Icon3dCubeSphere } from "@tabler/icons-react";
import { useState } from "react";

export function FolkZelje() {
  const user = useStore($currUser);
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      zelja: '',
    },

    validate: {
      zelja: (value) => (value.length > 3 ? null : 'Malo prekratko buraz'),
    },
  });

  const sendZelje = ({ zelja }: { zelja: string; }) => {
    setLoading(true)
    supabaseClient.from('zelje').insert({ zelja })
      .then(() => { notifications.show({ message: 'Bravo zdej vemo kaj hoces', icon: <Icon3dCubeSphere /> }) })
      .finally(() => { setLoading(false); form.reset() })
  }

  return (
    <Stack p="lg" pos="relative">
      <Title>Gerba žmurka</Title>
      <Title order={3}>Kaj hočeš čut</Title>
      <Group>
        <form onSubmit={form.onSubmit(sendZelje)}>
          <TextInput placeholder="zelje" label="ime komada za žmurkat" {...form.getInputProps('zelja')} />

          <Group justify="center" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Group>
      <LoadingOverlay visible={loading} disabled={form.isValid()}></LoadingOverlay>
    </Stack>
  );
}