import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import PostFeed from '../PostFeed';
import { notFound } from 'next/navigation';

export const CustomFeed = async () => {
    const session = await getAuthSession();

    // only rendered if session exists, so this will not happen
    if (!session) return notFound();

    const followedCommunities = await db.subscription.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            Community: true,
        },
    });

    let posts = await db.post.findMany({
        where: {
            Community: {
                name: {
                    in: followedCommunities.map((sub) => sub.Community.name),
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            Community: true,
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
    });

    const posts2 = await db.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            Community: true,
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
    });

    posts = posts.concat(posts2);

    return <PostFeed initialPosts={posts} />;
}

export default CustomFeed