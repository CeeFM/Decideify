USE [master]

IF db_id('Decideify') IS NULL
  CREATE DATABASE [Decideify]
GO

USE [Decideify]
GO


DROP TABLE IF EXISTS [PostReaction];
DROP TABLE IF EXISTS [PostTag];
DROP TABLE IF EXISTS [Reaction];
DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Subscription];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [SuggestionLibrary];
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Username] nvarchar(255) NOT NULL,
  [Password] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255),
  [IsPublic] BIT NOT NULL,
  [Bio] nvarchar(255)
)
GO

CREATE TABLE [Post] (
  [Id] int PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [ImageLocation] nvarchar(255),
  [CreateDateTime] datetime NOT NULL,
  [IsApproved] BIT NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY,
  [PostId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [Subject] nvarchar(255) NOT NULL,
  [Content] text NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [ContentType] nvarchar(255) NOT NULL,
  [ExternalId] int NOT NULL
)
GO

CREATE TABLE [PostReaction] (
  [Id] int PRIMARY KEY IDENTITY,
  [PostId] int NOT NULL,
  [ReactionId] int NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [PostTag] (
  [Id] int PRIMARY KEY IDENTITY,
  [PostId] int NOT NULL,
  [SuggestionId] int NOT NULL
)
GO

CREATE TABLE [Reaction] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Subscription] (
  [Id] int PRIMARY KEY IDENTITY,
  [SubscribeUserProfileId] int NOT NULL,
  [ProviderUserProfileId] int NOT NULL
)
GO

CREATE TABLE [SuggestionLibrary] (
  [Id] int PRIMARY KEY IDENTITY,
  [ContentType] nvarchar(255) NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [Details] nvarchar(255) NOT NULL,
  [Creator] nvarchar(255) NOT NULL,
  [ReleaseDate] datetime NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL,
  [CategoryId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [IsRecommended] BIT NOT NULL,
  [ExternalLink] nvarchar(255),
  [ExternalId] nvarchar(255)
)
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PostReaction] ADD FOREIGN KEY ([ReactionId]) REFERENCES [Reaction] ([Id])
GO

ALTER TABLE [PostReaction] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PostReaction] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO

ALTER TABLE [Subscription] ADD FOREIGN KEY ([SubscribeUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Subscription] ADD FOREIGN KEY ([ProviderUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO

ALTER TABLE [SuggestionLibrary] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [SuggestionLibrary] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PostTag] ADD FOREIGN KEY ([SuggestionId]) REFERENCES [SuggestionLibrary] ([Id])
GO

ALTER TABLE [PostTag] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO
