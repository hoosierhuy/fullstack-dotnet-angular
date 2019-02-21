namespace DatingApp.API.Models
{
    public class Like
    {
        public int LikerId { get; set; }
        public int LikeeId { get; set; }
        public UserModel Liker { get; set; }
        public UserModel Likee { get; set; }
    }
}