using Decideify.Models;
using Decideify.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Hosting;

namespace Decideify.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {

        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Content, p.CreateDateTime, p.ImageLocation, p.UserProfileId, p.IsApproved, u.Username, u.FirstName, u.LastName, u.Email, u.IsPublic, u.Bio, u.ImageLocation AS UserImage, u.CreateDateTime AS UserCreated
                                        FROM Post p
                                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                                        ORDER BY p.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsApproved = reader.IsDBNull(reader.GetOrdinal("IsApproved")) ? null : reader.GetBoolean(reader.GetOrdinal("IsApproved")),
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
                    return posts;
                }
            }
        }

        public List<Post> GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT p.Id, p.Title, p.Content, p.CreateDateTime, p.ImageLocation, p.UserProfileId, p.IsApproved, u.Username, u.FirstName, u.LastName, u.Email, u.IsPublic, u.Bio, u.ImageLocation AS UserImage, u.CreateDateTime AS UserCreated
                                        FROM Post p
                                        LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                                        WHERE p.UserProfileId = @Id
                                        ORDER BY p.CreateDateTime DESC";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Content = DbUtils.GetString(reader, "Content"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            IsApproved = reader.IsDBNull(reader.GetOrdinal("IsApproved")) ? null : reader.GetBoolean(reader.GetOrdinal("IsApproved")),
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
                    return posts;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, IsApproved, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @IsApproved, @UserProfileId)";
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@ImageLocation", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);


                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Edit(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Post
                        SET
                            Content = @Content, 
                            Title = @Title, 
                            ImageLocation = @ImageLocation, 
                            UserProfileId = @UserProfileId, 
                            IsApproved = @IsApproved, 
                            CreateDateTime = @CreateDateTime
                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", post.Id);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@ImageLocation", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from PostReaction
                            WHERE PostId = @id;

                            DELETE from PostTag
                            WHERE PostId = @id;

                            DELETE from Comment
                            WHERE PostId = @id

                            DELETE from Post
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", postId);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
