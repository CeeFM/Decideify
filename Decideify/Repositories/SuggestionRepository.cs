using Decideify.Models;
using Decideify.Utils;
using Microsoft.Data.SqlClient;

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
                    cmd.CommandText = @"SELECT * FROM Suggestion
                                        WHERE UserProfileId = @Id
                                        ORDER BY ContentType, Title";
                    DbUtils.AddParameter(cmd, "@Id", id);
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
                            IsRecommended = reader.IsDBNull(reader.GetOrdinal("IsRecommended")) ? null : reader.GetBoolean(reader.GetOrdinal("IsRecommended"))
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
                    cmd.Parameters.AddWithValue("@IsRecommended", DbUtils.ValueOrDBNull(suggestion.IsRecommended));
                    cmd.Parameters.AddWithValue("@ExternalLink", suggestion.ExternalLink);
                    cmd.Parameters.AddWithValue("@ExternalId", suggestion.ExternalId);

                    suggestion.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Suggestion suggestion)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Suggestion
                        SET
                            ContentType = @ContentType, 
                            Title = @Title, 
                            Details = @Details, 
                            Creator = @Creator, 
                            ReleaseDate = @ReleaseDate, 
                            ImageLocation = @ImageLocation, 
                            CategoryId = @CategoryId, 
                            UserProfileId = @UserProfileId, 
                            IsRecommended = @IsRecommended, 
                            ExternalLink = @ExternalLink, 
                            ExternalId = @ExternalId
                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", suggestion.Id);
                    cmd.Parameters.AddWithValue("@ContentType", suggestion.ContentType);
                    cmd.Parameters.AddWithValue("@Title", suggestion.Title);
                    cmd.Parameters.AddWithValue("@Creator", suggestion.Creator);
                    cmd.Parameters.AddWithValue("@Details", suggestion.Details);
                    cmd.Parameters.AddWithValue("@ReleaseDate", suggestion.ReleaseDate);
                    cmd.Parameters.AddWithValue("@ImageLocation", suggestion.ImageLocation);
                    cmd.Parameters.AddWithValue("@CategoryId", suggestion.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", suggestion.UserProfileId);
                    cmd.Parameters.AddWithValue("@IsRecommended", DbUtils.ValueOrDBNull(suggestion.IsRecommended));
                    cmd.Parameters.AddWithValue("@ExternalLink", suggestion.ExternalLink);
                    cmd.Parameters.AddWithValue("@ExternalId", suggestion.ExternalId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int suggestionId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from Suggestion
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", suggestionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
