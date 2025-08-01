import { GraphQLError } from "graphql";

const S3_BASE_URL = process.env.S3_BASE_URL || "";

export const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, ctx: any) => {
      if (!ctx.userId) throw new Error("No autenticado");
      return ctx.prisma.user.findUnique({
        where: { id: ctx.userId },
      });
    },

    user: async (_parent: any, args: { id: string }, ctx: any) => {
      return ctx.prisma.user.findUnique({
        where: { id: args.id },
      });
    },

    users: async (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.user.findMany();
    },

    profile: async (_parent: any, args: { userId: string }, ctx: any) => {
      return ctx.prisma.profile.findUnique({
        where: { userId: args.userId },
      });
    },

    profiles: async (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.profile.findMany();
    },

    platform: async (_parent: any, args: { id: string }, ctx: any) => {
      return ctx.prisma.platform.findUnique({
        where: { id: args.id },
      });
    },

    platforms: async (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.platform.findMany();
    },

    achievement: async (_parent: any, args: { id: string }, ctx: any) => {
      return ctx.prisma.achievement.findUnique({
        where: { id: BigInt(args.id) },
      });
    },

    achievements: async (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.achievement.findMany();
    },

    achievementRecords: async (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.achievementRecord.findMany();
    },

    follows: async (_parent: any, _args: any, ctx: any) => {
      return ctx.prisma.follow.findMany();
    },

    profileFromUser: async (_parent: any, args: any, ctx: any) => {
      if (!ctx.userId) {
        throw new GraphQLError("No autenticado", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userId },
        select: {
          profile: {
            select: {
              id: true,
              displayName: true,
              avatarUrl: true,
              userId: true,
            },
          },
        },
      });

      if (!user || !user.profile) {
        throw new Error("Perfil no encontrado para ese usuario");
      }

      return user.profile;
    },
  },

  User: {
    profile: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.profile.findUnique({ where: { userId: parent.id } });
    },
    achievements: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.achievementRecord.findMany({
        where: { userId: parent.id },
      });
    },
    followers: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.follow.findMany({ where: { followingId: parent.id } });
    },
    following: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.follow.findMany({ where: { followerId: parent.id } });
    },
  },

  Profile: {
    user: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.user.findUnique({ where: { id: parent.userId } });
    },
    avatarUrl: (parent: any) => {
      if (!parent.avatarUrl) return null;
      if (parent.avatarUrl.startsWith("http")) return parent.avatarUrl;
      return `${S3_BASE_URL}/${parent.avatarUrl}`;
    }
  },

  Platform: {
    achievements: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.achievement.findMany({
        where: { platformId: parent.id },
      });
    },
  },

  Achievement: {
    platform: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.platform.findUnique({
        where: { id: parent.platformId },
      });
    },
    records: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.achievementRecord.findMany({
        where: { achievementId: parent.id },
      });
    },
  },

  AchievementRecord: {
    user: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.user.findUnique({ where: { id: parent.userId } });
    },
    achievement: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.achievement.findUnique({
        where: { id: parent.achievementId },
      });
    },
  },

  Follow: {
    follower: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.user.findUnique({ where: { id: parent.followerId } });
    },
    following: async (parent: any, _args: any, ctx: any) => {
      return ctx.prisma.user.findUnique({ where: { id: parent.followingId } });
    },
  },
};
