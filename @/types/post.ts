export interface Post {
    id: number
    content: string
    created: string
    likes: number
    user: User
    likesList: any
    attachment: any
    active: boolean
  }
  
  export interface User {
    id: number
    username: string
    uuid: string
    active: boolean
  }