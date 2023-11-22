export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      zelje: {
        Row: {
          clicks: number;
          created_at: string;
          id: number;
          zelja: string | null;
        };
        Insert: {
          clicks?: number;
          created_at?: string;
          id?: number;
          zelja?: string | null;
        };
        Update: {
          clicks?: number;
          created_at?: string;
          id?: number;
          zelja?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
