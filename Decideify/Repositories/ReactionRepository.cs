using Decideify.Models;
using Decideify.Utils;

namespace Decideify.Repositories
{
    public class ReactionRepository : BaseRepository, IReactionRepository
    {
        public ReactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Reaction> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, ImageLocation
                        FROM Reaction
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    var reactions = new List<Reaction>();
                    while (reader.Read())
                    {
                        reactions.Add(new Reaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                        });
                    }
                    reader.Close();
                    return reactions;
                }
            }
        }

        public Reaction GetById(int reactionId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Name, ImageLocation
                        FROM Reaction
                        WHERE Id = @Id
                        ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    cmd.Parameters.AddWithValue("@Id", reactionId);

                    Reaction reaction = null;

                    while (reader.Read())
                    {
                        if (reaction == null)
                        {
                            reaction = new Reaction()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                ImageLocation = DbUtils.GetString(reader, "ImageLocation")
                            };
                        }
                    }
                    reader.Close();
                    return reaction;
                }
            }
        }
    }
}
