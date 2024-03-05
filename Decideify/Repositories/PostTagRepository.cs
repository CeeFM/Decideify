using Decideify.Models;
using Decideify.Utils;

namespace Decideify.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostTag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pt.Id AS PostTagId, 
                               pt.PostId, 
                               pt.SuggestionId, 
                               s.ContentType, 
                               s.Title, 
                               s.Details, 
                               s.Creator, 
                               s.ReleaseDate, 
                               s.ImageLocation, 
                               s.CategoryId, 
                               s.UserProfileId, 
                               s.IsRecommended
                        FROM PostTag pt
                        LEFT JOIN Suggestion s ON pt.SuggestionId = s.Id";
                    var reader = cmd.ExecuteReader();
                    var postTags = new List<PostTag>();
                    while (reader.Read())
                    {
                        postTags.Add(new PostTag()
                        {
                            Id = DbUtils.GetInt(reader, "PostTagId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            SuggestionId = DbUtils.GetInt(reader, "SuggestionId"),
                            Suggestion = new Suggestion()
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
                            }
                        });
                    }
                    reader.Close();
                    return postTags;
                }
            }
        }

        public PostTag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pt.Id AS PostTagId, 
                               pt.PostId, 
                               pt.SuggestionId, 
                               s.ContentType, 
                               s.Title, 
                               s.Details, 
                               s.Creator, 
                               s.ReleaseDate, 
                               s.ImageLocation, 
                               s.CategoryId, 
                               s.UserProfileId, 
                               s.IsRecommended
                        FROM PostTag pt
                        LEFT JOIN Suggestion s ON pt.SuggestionId = s.Id
                        WHERE PostTagId = @Id";
                    var reader = cmd.ExecuteReader();
                    cmd.Parameters.AddWithValue("@Id", id);

                    PostTag posttag = null;

                    while (reader.Read())
                    {
                        if (posttag == null)
                        {
                            posttag = new PostTag()
                            {
                                Id = DbUtils.GetInt(reader, "PostTagId"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                SuggestionId = DbUtils.GetInt(reader, "SuggestionId"),
                                Suggestion = new Suggestion()
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
                                }
                            };
                        }
                    }
                    reader.Close();
                    return posttag;
                }
            }
        }
        public PostTag GetByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pt.Id AS PostTagId, 
                               pt.PostId, 
                               pt.SuggestionId, 
                               s.ContentType, 
                               s.Title, 
                               s.Details, 
                               s.Creator, 
                               s.ReleaseDate, 
                               s.ImageLocation, 
                               s.CategoryId, 
                               s.UserProfileId, 
                               s.IsRecommended
                        FROM PostTag pt
                        LEFT JOIN Suggestion s ON pt.SuggestionId = s.Id
                        WHERE pt.PostId = @Id";
                    var reader = cmd.ExecuteReader();
                    cmd.Parameters.AddWithValue("@Id", postId);

                    PostTag posttag = null;

                    while (reader.Read())
                    {
                        if (posttag == null)
                        {
                            posttag = new PostTag()
                            {
                                Id = DbUtils.GetInt(reader, "PostTagId"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                SuggestionId = DbUtils.GetInt(reader, "SuggestionId"),
                                Suggestion = new Suggestion()
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
                                }
                            };
                        }
                    }
                    reader.Close();
                    return posttag;
                }
            }
        }
        public void Add(PostTag posttag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostTag (
                            PostId, SuggestionId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @PostId, @SuggestionId )";
                    cmd.Parameters.AddWithValue("@PostId", posttag.PostId);
                    cmd.Parameters.AddWithValue("@SuggestionId", posttag.SuggestionId);

                    posttag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
