export interface Post {
    id: number
    content: string
    created: string
    likes: number
    user: User
    likesList: Array<Like>
    likedByUser: boolean
    attachment: any
    active: boolean
  }
  
  export interface User {
    id: number
    username: string
    uuid: string
    active: boolean
  }

  export interface Like {
    id: number
    user: User
  }