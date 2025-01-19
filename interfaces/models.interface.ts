export type APP_ROLE = 'admin' | 'moderator' | 'user'

export interface GDPInterface {
  id: string

  name: string
  category: string
  guild: string
  chapter: string
  amount: string
  description?: string

  created_at: Date
}

export interface Role {
  id: string

  user_id: string
  role: APP_ROLE

  created_at: Date
}
