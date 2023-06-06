type DocType = { _id: string, createdAt: Date, updatedAt: Date }

type User = {
  name: string
  username: string
  email: string
  address: {
	  street: string
	  city: string
	  zipCode: string
	} 

  phone: string
} 

type UserDoc = User & DocType

type Post = {
  user: User
  title: string
  body: string
} 

type PostDoc = Post & DocType

type Album = {
  user: User
  title: string
} 

type AlbumDoc = Album & DocType

type Chris = {
  money: string
  game: string
  talent: string
} 

type ChrisDoc = Chris & DocType

type MySchema = {
  user: User
  post: Post
  album: Album
  chris: Chris
} 

type ModelType<T extends keyof MySchema> = MySchema[T]