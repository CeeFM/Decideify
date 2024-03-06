using Decideify.Models;
using Decideify.Utils;
using Microsoft.Data.SqlClient;

namespace Decideify.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<Comment> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, u.Username, u.FirstName, u.LastName, u.Email, u.IsPublic, u.Bio, u.ImageLocation AS UserImage, u.CreateDateTime AS UserCreated
                                        FROM Comment c
                                        LEFT JOIN UserProfile u ON c.UserProfileId = u.Id";

                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Username = DbUtils.GetString(reader, "Username"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageLocation = DbUtils.GetString(reader, "UserImage"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreated"),
                                IsPublic = reader.GetBoolean(reader.GetOrdinal("IsPublic")),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                Password = "HIDDEN FOR PRIVACY YOU CREEPS"

                            }
                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public List<Comment> GetByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT c.Id, c.PostId, c.UserProfileId, c.Subject, c.Content, c.CreateDateTime, u.Username, u.FirstName, u.LastName, u.Email, u.IsPublic, u.Bio, u.ImageLocation AS UserImage, u.CreateDateTime AS UserCreated
                                        FROM Comment c
                                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                                        WHERE c.PostId = @PostId";

                    DbUtils.AddParameter(cmd, "@PostId", postId);

                    var reader = cmd.ExecuteReader();
                    var comments = new List<Comment>();
                    while (reader.Read())
                    {
                        comments.Add(new Comment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Subject = DbUtils.GetString(reader, "Subject"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                Username = DbUtils.GetString(reader, "Username"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ImageLocation = DbUtils.GetString(reader, "UserImage"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserCreated"),
                                IsPublic = reader.GetBoolean(reader.GetOrdinal("IsPublic")),
                                Bio = DbUtils.GetString(reader, "Bio"),
                                Password = "HIDDEN FOR PRIVACY YOU CREEPS"

                            }
                        });
                    }
                    reader.Close();
                    return comments;
                }
            }
        }

        public void Add(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (
                            PostId, UserProfileId, Subject, Content, CreateDateTime )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @PostId, @UserProfileId, @Subject, @Content, @CreateDateTime )";
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);


                    comment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Comment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Comment
                        SET
                            Content = @Content, 
                            Subject = @Subject, 
                            UserProfileId = @UserProfileId, 
                            PostId = @PostId, 
                            CreateDateTime = @CreateDateTime
                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", comment.Id);
                    cmd.Parameters.AddWithValue("@Content", comment.Content);
                    cmd.Parameters.AddWithValue("@Subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@PostId", comment.PostId);
                    cmd.Parameters.AddWithValue("@CreateDateTime", comment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@UserProfileId", comment.UserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int commentId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from Comment
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", commentId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
