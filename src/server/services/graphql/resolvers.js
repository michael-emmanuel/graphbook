import logger from '../../helpers/logger';

export default function resolver() {
  const { db } = this;
  const { Post, User, Chat, Message } = db.models;

  const resolvers = {
    Post: {
      user(post, args, context) {
        return post.getUser();
      },
    },
    Message: {
      user(message, args, context) {
        return message.getUser();
      },
      chat(message, args, context) {
        return message.getChat();
      },
    },
    Chat: {
      messages(chat, args, context) {
        return chat.getMessages({ order: [['id', 'ASC']] });
      },
      users(chat, args, context) {
        return chat.getUsers();
      },
    },
    RootQuery: {
      posts(roots, args, context) {
        return Post.findAll({ order: [['createdAt', 'DESC']] });
      },
      chats(root, args, context) {
        return User.findAll().then(users => {
          if (!users.length) {
            return [];
          }

          const usersRow = users[0];

          return Chat.findAll({
            include: [
              {
                model: User,
                required: true,
                through: { where: { userId: usersRow.id } },
              },
              {
                model: Message,
              },
            ],
          });
        });
      },
    },
    RootMutation: {
      addPost(root, { post }, context) {
        return User.findAll().then(users => {
          const usersRow = users[0];

          return Post.create({
            ...post,
          }).then(newPost => {
            return Promise.all([newPost.setUser(usersRow.id)]).then(() => {
              logger.log({
                level: 'info',
                message: 'Post was created',
              });
              return newPost;
            });
          });
        });
      },
    },
  };

  return resolvers;
}
