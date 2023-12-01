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
  IconMicrophone2,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { SongBox } from "../../components/SongBox";
import { supabaseClient } from "../../supabase/supabase";
import { useLiveKaraokeList } from "../../components/hooks.ts/karaokeListHook";

export function FolkKaraoke() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      imepriimek: "",
      komad: ""
    },

    validate: {
      imepriimek: (value) => (value.length > 3 ? null : "Malo prekratko buraz"),
      komad: (value) => (value.length > 3 ? null : "Malo prekratko buraz"),
    },
  });

  const { isLoading, karaoke } = useLiveKaraokeList();

  const sendPrijava = ({imepriimek, komad}: {imepriimek: string, komad: string}) => {
    setLoading(true);
    supabaseClient
      .from("karaoke")
      .insert({ imepriimek, komad })
      .then((response) => {
        if (!response.error) {
          notifications.show({
            message: "Bravo zdej vemo kaj bos pel",
            icon: <Icon3dCubeSphere />,
          });
          window.location.reload();
        } else {
          notifications.show({
            color: "red",
            message: response.error.message,
            icon: <IconAlertCircle />,
          });
        }
        setLoading(false);
      });
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

  return (
    <Container size="sm">
      <Center>
        <Stack p="lg" pos="relative" w="100%">
          <Title> Gerba žmurka</Title>
          <Title order={4} c="dimmed">
            Kaj hočeš zapet, prijavi se 🎤
          </Title>
          {/* <Group>
            <IconBrandSpotify color="#1DB954"></IconBrandSpotify>
            <Title order={6} c="green">
              DJu je ful doro če bi lahko poslali spotify link. tnx
            </Title>
          </Group> */}
          <Group justify="center" w="100%">
            <form
              onSubmit={form.onSubmit(sendPrijava)}
              style={{
                width: "100%",
              }}
            > 
              <TextInput 
                placeholder="ime priimek"
                label="Ime priimek"
                {...form.getInputProps("imepriimek")}
              />
              <TextInput 
                placeholder="{ mogoce url } naslov komada"
                label="Naslov komada"
                {...form.getInputProps("komad")}
              />

              <Group justify="center" mt="md">
                <Button
                  type="submit"
                  disabled={!form.isValid()}
                  fullWidth
                  size="md"
                  leftSection={<IconMicrophone2></IconMicrophone2>}
                  variant="gradient"
                >
                  Dodaj prijavo
                </Button>
              </Group>
            </form>
          </Group>

          <LoadingOverlay visible={loading} />
        </Stack>
      </Center>
      <Divider label="Seznam pevcev" py="lg" />
      {/* <Blockquote variant="gradient" icon={<IconConfetti />} m="md">
        Spam klikaj komad ka ti je dober, da bo DJ vidu ker je najbolj boljši.
        (ne prou prevec)
      </Blockquote> */}
      <SimpleGrid cols={1} py="xl" pos="relative">
        <LoadingOverlay visible={isLoading} />

        {sortedKaraoke.map((kar) => {
          return <SongBox karaoke={kar} key={kar.id}/>
        })}
      </SimpleGrid>

      <Divider label="Seznam odpetih komadov" py="lg" />

      <SimpleGrid cols={1} py="xl" pos="relative">
        <LoadingOverlay visible={isLoading} />

        {sortedKaraokeOdpete.map((kar) => {
          return <SongBox karaoke={kar} key={kar.id}/>
        })}
      </SimpleGrid>
    </Container>
  );
}
