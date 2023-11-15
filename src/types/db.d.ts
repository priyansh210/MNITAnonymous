export type ExtendedPost = Post & {
    community: Community,
    votes: Vote,
    author: User,
    comments: Comment
}