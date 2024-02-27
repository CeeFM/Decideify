﻿using Decideify.Models;
using Decideify.Utils;

namespace Decideify.Repositories
{
    public class SuggestionRepository : BaseRepository, ISuggestionRepository
    {
        public SuggestionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Suggestion> GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Suggestion";
                    var reader = cmd.ExecuteReader();
                    var suggestions = new List<Suggestion>();
                    while (reader.Read())
                    {
                        suggestions.Add(new Suggestion()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ContentType = DbUtils.GetString(reader, "ContentType"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Details = DbUtils.GetString(reader, "Details"),
                            Creator = DbUtils.GetString(reader, "Creator"),
                            ReleaseDate = DbUtils.GetDateTime(reader, "ReleaseDate"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            ExternalLink = DbUtils.GetString(reader, "ExternalLink"),
                            ExternalId = DbUtils.GetString(reader, "ExternalId"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsRecommended = reader.GetBoolean(reader.GetOrdinal("IsRecommended"))
                        });
                    }
                    reader.Close();
                    return suggestions;
                }
            }
        }

        public void Add(Suggestion suggestion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Suggestion (
                            ContentType, Title, Details, Creator, ReleaseDate, ImageLocation, CategoryId, UserProfileId, IsRecommended, ExternalLink, ExternalId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @ContentType, @Title, @Details, @Creator, @ReleaseDate, @ImageLocation, @CategoryId, @UserProfileId, @IsRecommended, @ExternalLink, @ExternalId)";
                    cmd.Parameters.AddWithValue("@ContentType", suggestion.ContentType);
                    cmd.Parameters.AddWithValue("@Title", suggestion.Title);
                    cmd.Parameters.AddWithValue("@Creator", suggestion.Creator);
                    cmd.Parameters.AddWithValue("@Details", suggestion.Details);
                    cmd.Parameters.AddWithValue("@ReleaseDate", suggestion.ReleaseDate);
                    cmd.Parameters.AddWithValue("@ImageLocation", suggestion.ImageLocation);
                    cmd.Parameters.AddWithValue("@CategoryId", suggestion.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", suggestion.UserProfileId);
                    cmd.Parameters.AddWithValue("@IsRecommended", suggestion.IsRecommended);
                    cmd.Parameters.AddWithValue("@ExternalLink", suggestion.ExternalLink);
                    cmd.Parameters.AddWithValue("@ExternalId", suggestion.ExternalId);

                    suggestion.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}