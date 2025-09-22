import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase usando variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdooombjtlstrqjqshuh.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkb29vbWJqdGxzdHJxanFzaHVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzOTU1NTQsImV4cCI6MjA3Mzk3MTU1NH0.fPUxQK0NGbY6oFSVcbpZe_uAvndST6jIh3wRbUl0WIE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para TypeScript
export interface Testimonial {
  id: string
  name: string
  position: string
  department: string
  unit: string
  content: string
  image_url?: string
  created_at: string
  updated_at: string
  is_approved: boolean
  is_featured: boolean
}

export interface TestimonialInsert {
  name: string
  position: string
  department: string
  unit: string
  content: string
  image_url?: string
}