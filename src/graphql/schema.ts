export const typeDefs = `
  scalar DateTime
  scalar BigInt

  type Query {
    me: User
    user(id: ID!): User
    users: [User!]!

    profile(userId: ID!): Profile
    profiles: [Profile!]!
    profileFromUser: Profile

    platform(id: ID!): Platform
    platforms: [Platform!]!

    achievement(id: BigInt!): Achievement
    achievements: [Achievement!]!

    achievementRecords: [AchievementRecord!]!

    follows: [Follow!]!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!

    profile: Profile
    achievements: [AchievementRecord!]!
    followers: [Follow!]!
    following: [Follow!]!
  }

  type Profile {
    id: ID!
    userId: ID!
    displayName: String
    bio: String
    country: String
    preferredServer: String
    avatarUrl: String

    user: User!
  }

  type Platform {
    id: ID!
    title: String!
    description: String!
    icon: String!

    achievements: [Achievement!]!
  }

  type Achievement {
    id: BigInt!
    title: String!
    description: String
    createdAt: DateTime!
    platformId: ID!

    platform: Platform!
    records: [AchievementRecord!]!
  }

  type AchievementRecord {
    id: BigInt!
    userId: ID!
    achievementId: BigInt!
    achievedAt: DateTime!

    user: User!
    achievement: Achievement!
  }

  type Follow {
    id: BigInt!
    followerId: ID!
    followingId: ID!
    createdAt: DateTime!

    follower: User!
    following: User!
  }
`;
