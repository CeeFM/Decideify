using Decideify.Models;
using Decideify.Utils;

namespace Decideify.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT * FROM Category";
                    var reader = cmd.ExecuteReader();
                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ContentType = DbUtils.GetString(reader, "ContentType"),
                            ExternalId = DbUtils.GetInt(reader, "ExternalId"),
                            ResultsCount = DbUtils.GetInt(reader, "ResultsCount"),
                            ShortName = DbUtils.GetString(reader, "ShortName"),

                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

        public List<Category> GetByType(string contentType)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Category
                                        WHERE ContentType = @contentType";
                    DbUtils.AddParameter(cmd, "@contentType", contentType);
                    var reader = cmd.ExecuteReader();
                    var categories = new List<Category>();
                    while (reader.Read())
                    {
                        categories.Add(new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ContentType = DbUtils.GetString(reader, "ContentType"),
                            ExternalId = DbUtils.GetInt(reader, "ExternalId"),
                            ResultsCount = DbUtils.GetInt(reader, "ResultsCount"),
                            ShortName = DbUtils.GetString(reader, "ShortName"),

                        });
                    }
                    reader.Close();
                    return categories;
                }
            }
        }

        public Category GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT * FROM Category
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();
                    Category category = null;

                    if (reader.Read())
                    {
                        category = new Category()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ContentType = DbUtils.GetString(reader, "ContentType"),
                            ExternalId = DbUtils.GetInt(reader, "ExternalId"),
                            ResultsCount = DbUtils.GetInt(reader, "ResultsCount"),
                            ShortName = DbUtils.GetString(reader, "ShortName"),
                        };
                    }
                    reader.Close();
                    return category;
                }
            }
        }
    }
}
