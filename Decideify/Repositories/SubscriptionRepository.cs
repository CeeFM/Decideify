using Decideify.Models;
using Decideify.Utils;
using Microsoft.Data.SqlClient;

namespace Decideify.Repositories
{
    public class SubscriptionRepository : BaseRepository, ISubscriptionRepository
    {
        public SubscriptionRepository(IConfiguration config) : base(config) { }

        public List<Subscription> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, SubscribeUserProfileId, ProviderUserProfileId
                        FROM Subscription";
                    var reader = cmd.ExecuteReader();
                    var subscriptions = new List<Subscription>();
                    while (reader.Read())
                    {
                        subscriptions.Add(new Subscription()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            SubscribeUserProfileId = DbUtils.GetInt(reader, "SubscribeUserProfileId"),
                            ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId")
                        });
                    }
                    reader.Close();
                    return subscriptions;
                }
            }
        }
        public void Add(Subscription subscription)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Subscription (
                            SubscribeUserProfileId, ProviderUserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES(
                            @SubscribeUserProfileId, @ProviderUserProfileId )";
                    cmd.Parameters.AddWithValue("@SubscribeUserProfileId", subscription.SubscribeUserProfileId);
                    cmd.Parameters.AddWithValue("@ProviderUserProfileId", subscription.ProviderUserProfileId);

                    subscription.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int subscribeUserProfileId, int providerUserProfileId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE from Subscription
                            WHERE SubscribeUserProfileId = @subscribeUserProfileId 
                            AND ProviderUserProfileId = @providerUserProfileId
                        ";
                    cmd.Parameters.AddWithValue("@subscribeUserProfileId ", subscribeUserProfileId);
                    cmd.Parameters.AddWithValue("@providerUserProfileId", providerUserProfileId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Subscription> GetSubscriptionsByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT Id, SubscribeUserProfileId, ProviderUserProfileId
                       FROM Subscription
                       WHERE SubscribeUserProfileId = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();


                    var subscriptions = new List<Subscription>();

                    while (reader.Read())
                    {
                        subscriptions.Add(NewSubFromReader(reader));
                    }

                    reader.Close();

                    return subscriptions;
                }
            }
        }

        private Subscription NewSubFromReader(SqlDataReader reader)
        {
            return new Subscription()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                SubscribeUserProfileId = DbUtils.GetInt(reader, "SubscribeUserProfileId"),
                ProviderUserProfileId = DbUtils.GetInt(reader, "ProviderUserProfileId")
            };
        }
    }
}
