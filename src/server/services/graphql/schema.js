const typeDefinitions = `
  type Post {
    id: Int
    text: String
    user: User
  }

  type User {
    avatar: String
    username: String
  }

  type RootQuery {
    posts: [Post]
  }

  schema {
    query: RootQuery
  }
`;

export default [typeDefinitions];
