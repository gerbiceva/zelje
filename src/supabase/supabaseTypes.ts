export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      karaoke: {
        Row: {
          created_at: string
          hidden: boolean | null
          id: number
          imepriimek: string | null
          komad: string | null
        }
        Insert: {
          created_at?: string
          hidden?: boolean | null
          id?: number
          imepriimek?: string | null
          komad?: string | null
        }
        Update: {
          created_at?: string
          hidden?: boolean | null
          id?: number
          imepriimek?: string | null
          komad?: string | null
        }
        Relationships: []
      }
      zelje: {
        Row: {
          clicks: number
          created_at: string
          id: number
          updated_at: string | null
          zelja: string | null
        }
        Insert: {
          clicks?: number
          created_at?: string
          id?: number
          updated_at?: string | null
          zelja?: string | null
        }
        Update: {
          clicks?: number
          created_at?: string
          id?: number
          updated_at?: string | null
          zelja?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
