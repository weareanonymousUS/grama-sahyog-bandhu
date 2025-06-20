export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agriculture_requests: {
        Row: {
          crop_type: string | null
          description: string
          documents: Json | null
          email: string | null
          id: string
          land_area: number | null
          location: string | null
          name: string
          phone: string
          problem_type: string
          status: string | null
          submitted_at: string | null
          survey_number: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          crop_type?: string | null
          description: string
          documents?: Json | null
          email?: string | null
          id?: string
          land_area?: number | null
          location?: string | null
          name: string
          phone: string
          problem_type: string
          status?: string | null
          submitted_at?: string | null
          survey_number?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          crop_type?: string | null
          description?: string
          documents?: Json | null
          email?: string | null
          id?: string
          land_area?: number | null
          location?: string | null
          name?: string
          phone?: string
          problem_type?: string
          status?: string | null
          submitted_at?: string | null
          survey_number?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      citizen_requests: {
        Row: {
          email: string | null
          form_data: Json
          id: string
          name: string
          phone: string
          problem_type: string
          sector: string
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          email?: string | null
          form_data?: Json
          id?: string
          name: string
          phone: string
          problem_type: string
          sector: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          email?: string | null
          form_data?: Json
          id?: string
          name?: string
          phone?: string
          problem_type?: string
          sector?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      education_requests: {
        Row: {
          academic_year: string | null
          class: string | null
          description: string
          documents: Json | null
          email: string | null
          id: string
          name: string
          phone: string
          problem_type: string
          school_name: string | null
          status: string | null
          student_name: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          academic_year?: string | null
          class?: string | null
          description: string
          documents?: Json | null
          email?: string | null
          id?: string
          name: string
          phone: string
          problem_type: string
          school_name?: string | null
          status?: string | null
          student_name?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          academic_year?: string | null
          class?: string | null
          description?: string
          documents?: Json | null
          email?: string | null
          id?: string
          name?: string
          phone?: string
          problem_type?: string
          school_name?: string | null
          status?: string | null
          student_name?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      electricity_requests: {
        Row: {
          consumer_number: string | null
          description: string
          documents: Json | null
          email: string | null
          id: string
          issue_type: string | null
          location: string
          name: string
          phone: string
          problem_type: string
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          consumer_number?: string | null
          description: string
          documents?: Json | null
          email?: string | null
          id?: string
          issue_type?: string | null
          location: string
          name: string
          phone: string
          problem_type: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          consumer_number?: string | null
          description?: string
          documents?: Json | null
          email?: string | null
          id?: string
          issue_type?: string | null
          location?: string
          name?: string
          phone?: string
          problem_type?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      employment_requests: {
        Row: {
          description: string
          documents: Json | null
          email: string | null
          id: string
          job_card_number: string | null
          name: string
          phone: string
          problem_type: string
          skill_area: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
          work_type: string | null
        }
        Insert: {
          description: string
          documents?: Json | null
          email?: string | null
          id?: string
          job_card_number?: string | null
          name: string
          phone: string
          problem_type: string
          skill_area?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
          work_type?: string | null
        }
        Update: {
          description?: string
          documents?: Json | null
          email?: string | null
          id?: string
          job_card_number?: string | null
          name?: string
          phone?: string
          problem_type?: string
          skill_area?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
          work_type?: string | null
        }
        Relationships: []
      }
      health_requests: {
        Row: {
          description: string
          documents: Json | null
          email: string | null
          hospital_name: string | null
          id: string
          name: string
          patient_age: number | null
          phone: string
          problem_type: string
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          description: string
          documents?: Json | null
          email?: string | null
          hospital_name?: string | null
          id?: string
          name: string
          patient_age?: number | null
          phone: string
          problem_type: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          description?: string
          documents?: Json | null
          email?: string | null
          hospital_name?: string | null
          id?: string
          name?: string
          patient_age?: number | null
          phone?: string
          problem_type?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: []
      }
      housing_requests: {
        Row: {
          construction_type: string | null
          description: string
          documents: Json | null
          email: string | null
          family_size: number | null
          id: string
          name: string
          phone: string
          plot_number: string | null
          problem_type: string
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          construction_type?: string | null
          description: string
          documents?: Json | null
          email?: string | null
          family_size?: number | null
          id?: string
          name: string
          phone: string
          plot_number?: string | null
          problem_type: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          construction_type?: string | null
          description?: string
          documents?: Json | null
          email?: string | null
          family_size?: number | null
          id?: string
          name?: string
          phone?: string
          plot_number?: string | null
          problem_type?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          district: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          preferred_language: string | null
          updated_at: string | null
          village: string | null
        }
        Insert: {
          created_at?: string | null
          district?: string | null
          full_name?: string | null
          id: string
          phone_number?: string | null
          preferred_language?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string | null
          district?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          preferred_language?: string | null
          updated_at?: string | null
          village?: string | null
        }
        Relationships: []
      }
      roads_infrastructure_requests: {
        Row: {
          description: string
          documents: Json | null
          email: string | null
          id: string
          location: string
          name: string
          phone: string
          problem_type: string
          road_type: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          urgency_level: string | null
          user_id: string
        }
        Insert: {
          description: string
          documents?: Json | null
          email?: string | null
          id?: string
          location: string
          name: string
          phone: string
          problem_type: string
          road_type?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id: string
        }
        Update: {
          description?: string
          documents?: Json | null
          email?: string | null
          id?: string
          location?: string
          name?: string
          phone?: string
          problem_type?: string
          road_type?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          urgency_level?: string | null
          user_id?: string
        }
        Relationships: []
      }
      welfare_requests: {
        Row: {
          beneficiary_age: number | null
          beneficiary_name: string | null
          description: string
          documents: Json | null
          email: string | null
          id: string
          name: string
          phone: string
          problem_type: string
          service_type: string | null
          status: string | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          beneficiary_age?: number | null
          beneficiary_name?: string | null
          description: string
          documents?: Json | null
          email?: string | null
          id?: string
          name: string
          phone: string
          problem_type: string
          service_type?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          beneficiary_age?: number | null
          beneficiary_name?: string | null
          description?: string
          documents?: Json | null
          email?: string | null
          id?: string
          name?: string
          phone?: string
          problem_type?: string
          service_type?: string | null
          status?: string | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
