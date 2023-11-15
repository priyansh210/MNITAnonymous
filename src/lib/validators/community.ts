import { z } from 'zod'

export const CommunityValidator = z.object({
    name: z.string().min(3).max(21),
})

export const CommunitySubscriptionValidator = z.object({
    CommunityId: z.string(),
})

export type CreateCommunityPayload = z.infer<typeof CommunityValidator>
export type SubscribeToCommunityPayload = z.infer<
    typeof CommunitySubscriptionValidator
>