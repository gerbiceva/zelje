import { useEffect, useState } from "react";
import { Tables, supabaseClient } from "../../supabase/supabase";
import { PostgrestError } from "@supabase/supabase-js";

let karaokeBuffer: Tables<"karaoke">[] = [];
export const useLiveKaraokeList = () => {
  const [karaoke, setKaraoke] = useState<Tables<"karaoke">[]>([]);
  const [err, setErr] = useState<Error | PostgrestError>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    karaokeBuffer = [...karaoke];
  }, [karaoke]);

  const updateKaraoke = () => {
    setKaraoke(karaoke);
  };

  useEffect(() => {
    supabaseClient
      .channel("schema-db-changes")
      .on<Tables<"karaoke">>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
        },
        (payload) => {
          if (payload.errors) {
            setErr(new Error(payload.errors[0]));
            setKaraoke([]);
            return;
          }
          // find old index
          for (let i = 0; i < karaokeBuffer.length; i++) {
            if (karaokeBuffer[i].id == payload.old.id) {
              if (payload.new.hidden) {
                karaokeBuffer[i].hidden = payload.new.hidden;
              } else if (payload.new.likes) {
                karaokeBuffer[i].likes = payload.new.likes;
              }
            }
          }
          setKaraoke([...karaokeBuffer]);
        }
      )
      .on<Tables<"karaoke">>(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          console.log({ payload });

          if (payload.errors) {
            setErr(new Error(payload.errors[0]));
            return;
          }

          if (payload.new) {
            setKaraoke([payload.new, ...karaokeBuffer]);
          }
        }
      )
      .on<Tables<"karaoke">>(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
        },
        (payload) => {
          if (payload.errors) {
            setErr(new Error(payload.errors[0]));
            setKaraoke([]);
            return;
          }
          setKaraoke(karaokeBuffer.filter((value) => value.id != payload.old.id));
        }
      )
      .subscribe((state) => {
        console.log(state);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    supabaseClient
      .from("karaoke")
      .select()
      .then((resp) => {
        if (resp.error) {
          setErr(resp.error);
        } else {
          if (resp.data) {
            setKaraoke(resp.data);
            karaokeBuffer = resp.data;
          }
        }
        setLoading(false);
      });
  }, []);

  return {
    karaoke,
    isLoading,
    err,
    updateKaraoke
  }
};