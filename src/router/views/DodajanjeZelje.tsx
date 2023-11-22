import {
  Blockquote,
  Button,
  Center,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  Icon3dCubeSphere,
  IconAlertCircle,
  IconConfetti,
  IconSparkles,
} from "@tabler/icons-react";
import { useState } from "react";
import { SongBox } from "../../components/SongBox";
import { useLiveSongList } from "../../components/hooks.ts/songListHook";
import { supabaseClient } from "../../supabase/supabase";
import { score } from "../../components/heuristic";
import useTimeInSeconds from "../../components/hooks.ts/useTimer";

export function FolkZelje() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      zelja: "",
    },

    validate: {
      zelja: (value) => (value.length > 3 ? null : "Malo prekratko buraz"),
    },
  });

  const { isLoading, zelje } = useLiveSongList();
  const timeSec = useTimeInSeconds();

  const sendZelje = ({ zelja }: { zelja: string }) => {
    setLoading(true);
    supabaseClient
      .from("zelje")
      .insert({ zelja })
      .then((response) => {
        if (!response.error) {
          notifications.show({
            message: "Bravo zdej vemo kaj hoces",
            icon: <Icon3dCubeSphere />,
          });
          // form.reset
          window.location.replace("/");
        } else {
          notifications.show({
            color: "red",
            message: "AAA DEBIL PEJDI NA WIFI NEKAJ NEDELA",
            icon: <IconAlertCircle />,
          });
        }
        setLoading(false);
      });
  };

  return (
    <Container size="sm">
      <Center>
        <Stack p="lg" pos="relative" w="100%">
          <Title> Gerba žmurka</Title>
          <Title order={4} c="dimmed">
            Kaj hočeš čut? Dodaj svoje zelje 🥬
          </Title>
          <Group justify="center" w="100%">
            <form
              onSubmit={form.onSubmit(sendZelje)}
              style={{
                width: "100%",
              }}
            >
              <TextInput
                placeholder="{ mogoce url } bolaaan komaad"
                label="ime komada za žmurkat"
                {...form.getInputProps("zelja")}
              />

              <Group justify="center" mt="md">
                <Button
                  type="submit"
                  disabled={!form.isValid()}
                  fullWidth
                  size="md"
                  leftSection={<IconSparkles></IconSparkles>}
                  variant="gradient"
                >
                  Dodaj muzikico
                </Button>
              </Group>
            </form>
          </Group>

          <LoadingOverlay visible={loading} />
        </Stack>
      </Center>
      <Divider label="Volitve za komade" py="lg" />
      <Blockquote variant="gradient" icon={<IconConfetti />} m="md">
        Spam klikaj komad ka ti je dober, da bo DJ vidu ker je najbolj boljši.
        (ne prou prevec)
      </Blockquote>
      <SimpleGrid cols={1} py="xl" pos="relative">
        <LoadingOverlay visible={isLoading} />

        {zelje
          .sort(
            (a, b) =>
              score(b.updated_at, b.clicks, timeSec) -
              score(a.updated_at, a.clicks, timeSec)
          )
          .map((zelja) => {
            return <SongBox zelja={zelja} key={zelja.id} />;
          })}
      </SimpleGrid>
    </Container>
  );
}
