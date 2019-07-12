module.exports = {
        typeDefs: /* GraphQL */ `type AggregateAlert {
  count: Int!
}

type AggregateComment {
  count: Int!
}

type AggregateMessage {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Alert {
  id: ID!
  onPost: Post
  onComment: Comment
  onFollower: User
  onFollowed: User
  seen: Boolean!
  createdAt: DateTime!
}

type AlertConnection {
  pageInfo: PageInfo!
  edges: [AlertEdge]!
  aggregate: AggregateAlert!
}

input AlertCreateInput {
  onPost: PostCreateOneInput
  onComment: CommentCreateOneInput
  onFollower: UserCreateOneInput
  onFollowed: UserCreateOneInput
  seen: Boolean!
}

type AlertEdge {
  node: Alert!
  cursor: String!
}

enum AlertOrderByInput {
  id_ASC
  id_DESC
  seen_ASC
  seen_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AlertPreviousValues {
  id: ID!
  seen: Boolean!
  createdAt: DateTime!
}

type AlertSubscriptionPayload {
  mutation: MutationType!
  node: Alert
  updatedFields: [String!]
  previousValues: AlertPreviousValues
}

input AlertSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: AlertWhereInput
  AND: [AlertSubscriptionWhereInput!]
  OR: [AlertSubscriptionWhereInput!]
  NOT: [AlertSubscriptionWhereInput!]
}

input AlertUpdateInput {
  onPost: PostUpdateOneInput
  onComment: CommentUpdateOneInput
  onFollower: UserUpdateOneInput
  onFollowed: UserUpdateOneInput
  seen: Boolean
}

input AlertUpdateManyMutationInput {
  seen: Boolean
}

input AlertWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  onPost: PostWhereInput
  onComment: CommentWhereInput
  onFollower: UserWhereInput
  onFollowed: UserWhereInput
  seen: Boolean
  seen_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [AlertWhereInput!]
  OR: [AlertWhereInput!]
  NOT: [AlertWhereInput!]
}

input AlertWhereUniqueInput {
  id: ID
}

type BatchPayload {
  count: Long!
}

type Comment {
  id: ID!
  content: String!
  postedOn: Post!
  postedBy: User!
  createdAt: DateTime!
  likes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  content: String!
  postedOn: PostCreateOneWithoutCommentsInput!
  postedBy: UserCreateOneWithoutCommentsInput!
  likes: UserCreateManyWithoutLikedCommentsInput
}

input CommentCreateManyWithoutLikesInput {
  create: [CommentCreateWithoutLikesInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutPostedByInput {
  create: [CommentCreateWithoutPostedByInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutPostedOnInput {
  create: [CommentCreateWithoutPostedOnInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateOneInput {
  create: CommentCreateInput
  connect: CommentWhereUniqueInput
}

input CommentCreateWithoutLikesInput {
  content: String!
  postedOn: PostCreateOneWithoutCommentsInput!
  postedBy: UserCreateOneWithoutCommentsInput!
}

input CommentCreateWithoutPostedByInput {
  content: String!
  postedOn: PostCreateOneWithoutCommentsInput!
  likes: UserCreateManyWithoutLikedCommentsInput
}

input CommentCreateWithoutPostedOnInput {
  content: String!
  postedBy: UserCreateOneWithoutCommentsInput!
  likes: UserCreateManyWithoutLikedCommentsInput
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  content: String!
  createdAt: DateTime!
}

input CommentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [CommentScalarWhereInput!]
  OR: [CommentScalarWhereInput!]
  NOT: [CommentScalarWhereInput!]
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateDataInput {
  content: String
  postedOn: PostUpdateOneRequiredWithoutCommentsInput
  postedBy: UserUpdateOneRequiredWithoutCommentsInput
  likes: UserUpdateManyWithoutLikedCommentsInput
}

input CommentUpdateInput {
  content: String
  postedOn: PostUpdateOneRequiredWithoutCommentsInput
  postedBy: UserUpdateOneRequiredWithoutCommentsInput
  likes: UserUpdateManyWithoutLikedCommentsInput
}

input CommentUpdateManyDataInput {
  content: String
}

input CommentUpdateManyMutationInput {
  content: String
}

input CommentUpdateManyWithoutLikesInput {
  create: [CommentCreateWithoutLikesInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutLikesInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutLikesInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutPostedByInput {
  create: [CommentCreateWithoutPostedByInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPostedByInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPostedByInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutPostedOnInput {
  create: [CommentCreateWithoutPostedOnInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutPostedOnInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutPostedOnInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateOneInput {
  create: CommentCreateInput
  update: CommentUpdateDataInput
  upsert: CommentUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: CommentWhereUniqueInput
}

input CommentUpdateWithoutLikesDataInput {
  content: String
  postedOn: PostUpdateOneRequiredWithoutCommentsInput
  postedBy: UserUpdateOneRequiredWithoutCommentsInput
}

input CommentUpdateWithoutPostedByDataInput {
  content: String
  postedOn: PostUpdateOneRequiredWithoutCommentsInput
  likes: UserUpdateManyWithoutLikedCommentsInput
}

input CommentUpdateWithoutPostedOnDataInput {
  content: String
  postedBy: UserUpdateOneRequiredWithoutCommentsInput
  likes: UserUpdateManyWithoutLikedCommentsInput
}

input CommentUpdateWithWhereUniqueWithoutLikesInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutLikesDataInput!
}

input CommentUpdateWithWhereUniqueWithoutPostedByInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPostedByDataInput!
}

input CommentUpdateWithWhereUniqueWithoutPostedOnInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutPostedOnDataInput!
}

input CommentUpsertNestedInput {
  update: CommentUpdateDataInput!
  create: CommentCreateInput!
}

input CommentUpsertWithWhereUniqueWithoutLikesInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutLikesDataInput!
  create: CommentCreateWithoutLikesInput!
}

input CommentUpsertWithWhereUniqueWithoutPostedByInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPostedByDataInput!
  create: CommentCreateWithoutPostedByInput!
}

input CommentUpsertWithWhereUniqueWithoutPostedOnInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutPostedOnDataInput!
  create: CommentCreateWithoutPostedOnInput!
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  postedOn: PostWhereInput
  postedBy: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  likes_every: UserWhereInput
  likes_some: UserWhereInput
  likes_none: UserWhereInput
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Message {
  id: ID!
  from: User!
  to: User!
  content: String!
  seen: Boolean!
  createdAt: DateTime!
}

type MessageConnection {
  pageInfo: PageInfo!
  edges: [MessageEdge]!
  aggregate: AggregateMessage!
}

input MessageCreateInput {
  from: UserCreateOneInput!
  to: UserCreateOneInput!
  content: String!
  seen: Boolean!
}

type MessageEdge {
  node: Message!
  cursor: String!
}

enum MessageOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  seen_ASC
  seen_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MessagePreviousValues {
  id: ID!
  content: String!
  seen: Boolean!
  createdAt: DateTime!
}

type MessageSubscriptionPayload {
  mutation: MutationType!
  node: Message
  updatedFields: [String!]
  previousValues: MessagePreviousValues
}

input MessageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MessageWhereInput
  AND: [MessageSubscriptionWhereInput!]
  OR: [MessageSubscriptionWhereInput!]
  NOT: [MessageSubscriptionWhereInput!]
}

input MessageUpdateInput {
  from: UserUpdateOneRequiredInput
  to: UserUpdateOneRequiredInput
  content: String
  seen: Boolean
}

input MessageUpdateManyMutationInput {
  content: String
  seen: Boolean
}

input MessageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  from: UserWhereInput
  to: UserWhereInput
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  seen: Boolean
  seen_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [MessageWhereInput!]
  OR: [MessageWhereInput!]
  NOT: [MessageWhereInput!]
}

input MessageWhereUniqueInput {
  id: ID
}

type Mutation {
  createAlert(data: AlertCreateInput!): Alert!
  updateAlert(data: AlertUpdateInput!, where: AlertWhereUniqueInput!): Alert
  updateManyAlerts(data: AlertUpdateManyMutationInput!, where: AlertWhereInput): BatchPayload!
  upsertAlert(where: AlertWhereUniqueInput!, create: AlertCreateInput!, update: AlertUpdateInput!): Alert!
  deleteAlert(where: AlertWhereUniqueInput!): Alert
  deleteManyAlerts(where: AlertWhereInput): BatchPayload!
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createMessage(data: MessageCreateInput!): Message!
  updateMessage(data: MessageUpdateInput!, where: MessageWhereUniqueInput!): Message
  updateManyMessages(data: MessageUpdateManyMutationInput!, where: MessageWhereInput): BatchPayload!
  upsertMessage(where: MessageWhereUniqueInput!, create: MessageCreateInput!, update: MessageUpdateInput!): Message!
  deleteMessage(where: MessageWhereUniqueInput!): Message
  deleteManyMessages(where: MessageWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  content: String!
  postedBy: User!
  createdAt: DateTime!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  isPrivate: Boolean
  likes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  postedOn: User
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  content: String!
  postedBy: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserCreateManyWithoutLikedPostsInput
  postedOn: UserCreateOneWithoutTimelinePostsInput
}

input PostCreateManyWithoutLikesInput {
  create: [PostCreateWithoutLikesInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateManyWithoutPostedByInput {
  create: [PostCreateWithoutPostedByInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateManyWithoutPostedOnInput {
  create: [PostCreateWithoutPostedOnInput!]
  connect: [PostWhereUniqueInput!]
}

input PostCreateOneInput {
  create: PostCreateInput
  connect: PostWhereUniqueInput
}

input PostCreateOneWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostCreateWithoutCommentsInput {
  content: String!
  postedBy: UserCreateOneWithoutPostsInput!
  isPrivate: Boolean
  likes: UserCreateManyWithoutLikedPostsInput
  postedOn: UserCreateOneWithoutTimelinePostsInput
}

input PostCreateWithoutLikesInput {
  content: String!
  postedBy: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostedOnInput
  isPrivate: Boolean
  postedOn: UserCreateOneWithoutTimelinePostsInput
}

input PostCreateWithoutPostedByInput {
  content: String!
  comments: CommentCreateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserCreateManyWithoutLikedPostsInput
  postedOn: UserCreateOneWithoutTimelinePostsInput
}

input PostCreateWithoutPostedOnInput {
  content: String!
  postedBy: UserCreateOneWithoutPostsInput!
  comments: CommentCreateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserCreateManyWithoutLikedPostsInput
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  content_ASC
  content_DESC
  createdAt_ASC
  createdAt_DESC
  isPrivate_ASC
  isPrivate_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PostPreviousValues {
  id: ID!
  content: String!
  createdAt: DateTime!
  isPrivate: Boolean
}

input PostScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  isPrivate: Boolean
  isPrivate_not: Boolean
  AND: [PostScalarWhereInput!]
  OR: [PostScalarWhereInput!]
  NOT: [PostScalarWhereInput!]
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateDataInput {
  content: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserUpdateManyWithoutLikedPostsInput
  postedOn: UserUpdateOneWithoutTimelinePostsInput
}

input PostUpdateInput {
  content: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserUpdateManyWithoutLikedPostsInput
  postedOn: UserUpdateOneWithoutTimelinePostsInput
}

input PostUpdateManyDataInput {
  content: String
  isPrivate: Boolean
}

input PostUpdateManyMutationInput {
  content: String
  isPrivate: Boolean
}

input PostUpdateManyWithoutLikesInput {
  create: [PostCreateWithoutLikesInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutLikesInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutLikesInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithoutPostedByInput {
  create: [PostCreateWithoutPostedByInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutPostedByInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutPostedByInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithoutPostedOnInput {
  create: [PostCreateWithoutPostedOnInput!]
  delete: [PostWhereUniqueInput!]
  connect: [PostWhereUniqueInput!]
  disconnect: [PostWhereUniqueInput!]
  update: [PostUpdateWithWhereUniqueWithoutPostedOnInput!]
  upsert: [PostUpsertWithWhereUniqueWithoutPostedOnInput!]
  deleteMany: [PostScalarWhereInput!]
  updateMany: [PostUpdateManyWithWhereNestedInput!]
}

input PostUpdateManyWithWhereNestedInput {
  where: PostScalarWhereInput!
  data: PostUpdateManyDataInput!
}

input PostUpdateOneInput {
  create: PostCreateInput
  update: PostUpdateDataInput
  upsert: PostUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: PostWhereUniqueInput
}

input PostUpdateOneRequiredWithoutCommentsInput {
  create: PostCreateWithoutCommentsInput
  update: PostUpdateWithoutCommentsDataInput
  upsert: PostUpsertWithoutCommentsInput
  connect: PostWhereUniqueInput
}

input PostUpdateWithoutCommentsDataInput {
  content: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
  isPrivate: Boolean
  likes: UserUpdateManyWithoutLikedPostsInput
  postedOn: UserUpdateOneWithoutTimelinePostsInput
}

input PostUpdateWithoutLikesDataInput {
  content: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostedOnInput
  isPrivate: Boolean
  postedOn: UserUpdateOneWithoutTimelinePostsInput
}

input PostUpdateWithoutPostedByDataInput {
  content: String
  comments: CommentUpdateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserUpdateManyWithoutLikedPostsInput
  postedOn: UserUpdateOneWithoutTimelinePostsInput
}

input PostUpdateWithoutPostedOnDataInput {
  content: String
  postedBy: UserUpdateOneRequiredWithoutPostsInput
  comments: CommentUpdateManyWithoutPostedOnInput
  isPrivate: Boolean
  likes: UserUpdateManyWithoutLikedPostsInput
}

input PostUpdateWithWhereUniqueWithoutLikesInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutLikesDataInput!
}

input PostUpdateWithWhereUniqueWithoutPostedByInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutPostedByDataInput!
}

input PostUpdateWithWhereUniqueWithoutPostedOnInput {
  where: PostWhereUniqueInput!
  data: PostUpdateWithoutPostedOnDataInput!
}

input PostUpsertNestedInput {
  update: PostUpdateDataInput!
  create: PostCreateInput!
}

input PostUpsertWithoutCommentsInput {
  update: PostUpdateWithoutCommentsDataInput!
  create: PostCreateWithoutCommentsInput!
}

input PostUpsertWithWhereUniqueWithoutLikesInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutLikesDataInput!
  create: PostCreateWithoutLikesInput!
}

input PostUpsertWithWhereUniqueWithoutPostedByInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutPostedByDataInput!
  create: PostCreateWithoutPostedByInput!
}

input PostUpsertWithWhereUniqueWithoutPostedOnInput {
  where: PostWhereUniqueInput!
  update: PostUpdateWithoutPostedOnDataInput!
  create: PostCreateWithoutPostedOnInput!
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  postedBy: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  isPrivate: Boolean
  isPrivate_not: Boolean
  likes_every: UserWhereInput
  likes_some: UserWhereInput
  likes_none: UserWhereInput
  postedOn: UserWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  alert(where: AlertWhereUniqueInput!): Alert
  alerts(where: AlertWhereInput, orderBy: AlertOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Alert]!
  alertsConnection(where: AlertWhereInput, orderBy: AlertOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AlertConnection!
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  message(where: MessageWhereUniqueInput!): Message
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message]!
  messagesConnection(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MessageConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  alert(where: AlertSubscriptionWhereInput): AlertSubscriptionPayload
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  avatar: String
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  following(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  followers(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  likedPosts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
  likedComments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  timelinePosts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  followers: UserCreateManyWithoutFollowersInput
  likedPosts: PostCreateManyWithoutLikesInput
  likedComments: CommentCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateManyWithoutFollowersInput {
  create: [UserCreateWithoutFollowersInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutFollowingInput {
  create: [UserCreateWithoutFollowingInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutLikedCommentsInput {
  create: [UserCreateWithoutLikedCommentsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateManyWithoutLikedPostsInput {
  create: [UserCreateWithoutLikedPostsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutTimelinePostsInput {
  create: UserCreateWithoutTimelinePostsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  followers: UserCreateManyWithoutFollowersInput
  likedPosts: PostCreateManyWithoutLikesInput
  likedComments: CommentCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateWithoutFollowersInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  likedPosts: PostCreateManyWithoutLikesInput
  likedComments: CommentCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateWithoutFollowingInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutPostedByInput
  followers: UserCreateManyWithoutFollowersInput
  likedPosts: PostCreateManyWithoutLikesInput
  likedComments: CommentCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateWithoutLikedCommentsInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  followers: UserCreateManyWithoutFollowersInput
  likedPosts: PostCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateWithoutLikedPostsInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  followers: UserCreateManyWithoutFollowersInput
  likedComments: CommentCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateWithoutPostsInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  comments: CommentCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  followers: UserCreateManyWithoutFollowersInput
  likedPosts: PostCreateManyWithoutLikesInput
  likedComments: CommentCreateManyWithoutLikesInput
  timelinePosts: PostCreateManyWithoutPostedOnInput
}

input UserCreateWithoutTimelinePostsInput {
  username: String!
  email: String!
  password: String!
  avatar: String
  posts: PostCreateManyWithoutPostedByInput
  comments: CommentCreateManyWithoutPostedByInput
  following: UserCreateManyWithoutFollowingInput
  followers: UserCreateManyWithoutFollowersInput
  likedPosts: PostCreateManyWithoutLikesInput
  likedComments: CommentCreateManyWithoutLikesInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  username_ASC
  username_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  avatar_ASC
  avatar_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  username: String!
  email: String!
  password: String!
  avatar: String
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateManyDataInput {
  username: String
  email: String
  password: String
  avatar: String
}

input UserUpdateManyMutationInput {
  username: String
  email: String
  password: String
  avatar: String
}

input UserUpdateManyWithoutFollowersInput {
  create: [UserCreateWithoutFollowersInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutFollowersInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutFollowersInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithoutFollowingInput {
  create: [UserCreateWithoutFollowingInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutFollowingInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutFollowingInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithoutLikedCommentsInput {
  create: [UserCreateWithoutLikedCommentsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutLikedCommentsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutLikedCommentsInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithoutLikedPostsInput {
  create: [UserCreateWithoutLikedPostsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutLikedPostsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutLikedPostsInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  update: UserUpdateWithoutCommentsDataInput
  upsert: UserUpsertWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutPostsInput {
  create: UserCreateWithoutPostsInput
  update: UserUpdateWithoutPostsDataInput
  upsert: UserUpsertWithoutPostsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutTimelinePostsInput {
  create: UserCreateWithoutTimelinePostsInput
  update: UserUpdateWithoutTimelinePostsDataInput
  upsert: UserUpsertWithoutTimelinePostsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCommentsDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateWithoutFollowersDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateWithoutFollowingDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateWithoutLikedCommentsDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateWithoutLikedPostsDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateWithoutPostsDataInput {
  username: String
  email: String
  password: String
  avatar: String
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
  timelinePosts: PostUpdateManyWithoutPostedOnInput
}

input UserUpdateWithoutTimelinePostsDataInput {
  username: String
  email: String
  password: String
  avatar: String
  posts: PostUpdateManyWithoutPostedByInput
  comments: CommentUpdateManyWithoutPostedByInput
  following: UserUpdateManyWithoutFollowingInput
  followers: UserUpdateManyWithoutFollowersInput
  likedPosts: PostUpdateManyWithoutLikesInput
  likedComments: CommentUpdateManyWithoutLikesInput
}

input UserUpdateWithWhereUniqueWithoutFollowersInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutFollowersDataInput!
}

input UserUpdateWithWhereUniqueWithoutFollowingInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutFollowingDataInput!
}

input UserUpdateWithWhereUniqueWithoutLikedCommentsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutLikedCommentsDataInput!
}

input UserUpdateWithWhereUniqueWithoutLikedPostsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutLikedPostsDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutCommentsInput {
  update: UserUpdateWithoutCommentsDataInput!
  create: UserCreateWithoutCommentsInput!
}

input UserUpsertWithoutPostsInput {
  update: UserUpdateWithoutPostsDataInput!
  create: UserCreateWithoutPostsInput!
}

input UserUpsertWithoutTimelinePostsInput {
  update: UserUpdateWithoutTimelinePostsDataInput!
  create: UserCreateWithoutTimelinePostsInput!
}

input UserUpsertWithWhereUniqueWithoutFollowersInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutFollowersDataInput!
  create: UserCreateWithoutFollowersInput!
}

input UserUpsertWithWhereUniqueWithoutFollowingInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutFollowingDataInput!
  create: UserCreateWithoutFollowingInput!
}

input UserUpsertWithWhereUniqueWithoutLikedCommentsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutLikedCommentsDataInput!
  create: UserCreateWithoutLikedCommentsInput!
}

input UserUpsertWithWhereUniqueWithoutLikedPostsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutLikedPostsDataInput!
  create: UserCreateWithoutLikedPostsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  avatar: String
  avatar_not: String
  avatar_in: [String!]
  avatar_not_in: [String!]
  avatar_lt: String
  avatar_lte: String
  avatar_gt: String
  avatar_gte: String
  avatar_contains: String
  avatar_not_contains: String
  avatar_starts_with: String
  avatar_not_starts_with: String
  avatar_ends_with: String
  avatar_not_ends_with: String
  posts_every: PostWhereInput
  posts_some: PostWhereInput
  posts_none: PostWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  following_every: UserWhereInput
  following_some: UserWhereInput
  following_none: UserWhereInput
  followers_every: UserWhereInput
  followers_some: UserWhereInput
  followers_none: UserWhereInput
  likedPosts_every: PostWhereInput
  likedPosts_some: PostWhereInput
  likedPosts_none: PostWhereInput
  likedComments_every: CommentWhereInput
  likedComments_some: CommentWhereInput
  likedComments_none: CommentWhereInput
  timelinePosts_every: PostWhereInput
  timelinePosts_some: PostWhereInput
  timelinePosts_none: PostWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
  email: String
}
`
      }
    