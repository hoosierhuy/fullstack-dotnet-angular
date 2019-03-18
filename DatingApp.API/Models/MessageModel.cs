using System;

namespace DatingApp.API.Models
{
  public class MessageModel
  {
    public int Id { get; set; }
    public int SenderId { get; set; }
    public UserModel Sender { get; set; }
    public int RecipientId { get; set; }
    public UserModel Recipient { get; set; }
    public string Content { get; set; }
    public bool IsRead { get; set; }
    public DateTime? DateRead { get; set; }
    public DateTime MessageSent { get; set; }
    public bool SenderDeleted { get; set; }
    public bool RecipientDeleted { get; set; }
  }
}