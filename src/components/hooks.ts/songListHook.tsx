import { useState, useEffect } from "react";
import { Tables, supabaseClient } from "../../supabase/supabase";
import { PostgrestError } from "@supabase/supabase-js";

export const useLiveSongList = () => {
  const [zelje, setZelje] = useState<Tables<"zelje">[]>([]);
  const [err, setErr] = useState<Error | PostgrestError>();
  const [isLoading, setLoading] = useState(true);

  const removeZelje = (id: number) => {
    setZelje(zelje.filter((zelja) => zelja.id != id));
  };

  supabaseClient
    .channel("schema-db-changes")

    .on<Tables<"zelje">>(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
      },
      (payload) => {
        if (payload.errors) {
          setErr(new Error(payload.errors[0]));
          setZelje([]);
          return;
        }
        // find old index
        console.log("UPDATE", payload.new, payload.old);
        for (let i = 0; i < zelje.length; i++) {
          if (zelje[i].id == payload.old.id) {
            zelje[i].clicks = payload.new.clicks;
          }
        }
        setZelje([...zelje]);
      }
    )
    .on<Tables<"zelje">>(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
      },
      (payload) => {
        console.log({ payload });

        if (payload.errors) {
          setErr(new Error(payload.errors[0]));
          setZelje([]);
          return;
        }

        if (payload.new) {
          setZelje([payload.new, ...zelje]);
        }
      }
    )
    .on<Tables<"zelje">>(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
      },
      (payload) => {
        if (payload.errors) {
          setErr(new Error(payload.errors[0]));
          setZelje([]);
          return;
        }
        setZelje(zelje.filter((zelja) => zelja.id != payload.old.id));
      }
    )
    .subscribe();

  useEffect(() => {
    setLoading(true);
    supabaseClient
      .from("zelje")
      .select()
      .then((resp) => {
        if (resp.error) {
          setErr(resp.error);
        } else {
          if (resp.data) {
            setZelje(resp.data);
          }
        }
        setLoading(false);
      });
  }, []);

  return {
    zelje,
    isLoading,
    err,
    removeZelje,
  };
};
