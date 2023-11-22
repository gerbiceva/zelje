import { useState, useEffect } from "react";
import { Tables, supabaseClient } from "../../supabase/supabase";
import { PostgrestError } from "@supabase/supabase-js";

let zeljeBuffer: Tables<"zelje">[] = [];
export const useLiveSongList = () => {
  const [zelje, setZelje] = useState<Tables<"zelje">[]>([]);
  const [err, setErr] = useState<Error | PostgrestError>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log(zeljeBuffer);
    zeljeBuffer = [...zelje];
  }, [zelje]);

  const removeZelje = (id: number) => {
    setZelje(zelje.filter((zelja) => zelja.id != id));
  };

  useEffect(() => {
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
          for (let i = 0; i < zeljeBuffer.length; i++) {
            if (zeljeBuffer[i].id == payload.old.id) {
              zeljeBuffer[i].clicks = payload.new.clicks;
            }
          }
          setZelje([...zeljeBuffer]);
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
            // zeljeBuffer = [];
            return;
          }

          if (payload.new) {
            setZelje([payload.new, ...zeljeBuffer]);
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
          setZelje(zeljeBuffer.filter((zelja) => zelja.id != payload.old.id));
        }
      )
      .subscribe((state) => {
        console.log(state);
      });
  }, []);

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
            zeljeBuffer = resp.data;
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
