using Decideify.Models;
using Decideify.Utils;
using Microsoft.Data.SqlClient;

namespace Decideify.Repositories
{
    public class PostReactionRepository : BaseRepository, IPostReactionRepository
    {
        public PostReactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostReaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, PostId, ReactionId, UserProfileId
                        FROM PostReaction
                        ORDER BY Id DESC";
                    var reader = cmd.ExecuteReader();
                    var postreactions = new List<PostReaction>();
                    while (reader.Read())
                    {
                        postreactions.Add(new PostReaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                        });
                    }
                    reader.Close();
                    return postreactions;
                }
            }
        }

        public List<PostReaction> GetByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, PostId, ReactionId, UserProfileId
                        FROM PostReaction
                        WHERE PostId = @postId
                        ORDER BY Id DESC";
                    cmd.Parameters.AddWithValue("@postId", postId);
                    var reader = cmd.ExecuteReader();
                    var postreactions = new List<PostReaction>();
                    while (reader.Read())
                    {
                        postreactions.Add(new PostReaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            ReactionId = DbUtils.GetInt(reader, "ReactionId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),

                        });
                    }
                    reader.Close();
                    return postreactions;
                }
            }
        }

        public void Add(PostReaction postreaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PostReaction (
                            PostId, ReactionId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @PostId, @ReactionId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@PostId", postreaction.PostId);
                    cmd.Parameters.AddWithValue("@ReactionId", postreaction.ReactionId);
                    cmd.Parameters.AddWithValue("@UserProfileId", postreaction.UserProfileId);

                    postreaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int reactionId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from PostReaction
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", reactionId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
