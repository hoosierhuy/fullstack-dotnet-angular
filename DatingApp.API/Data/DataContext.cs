using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<ValueModel> Values { get; set; }
    public DbSet<UserModel> Users { get; set; }
    public DbSet<PhotoModel> Photos { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<MessageModel> Messages { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.Entity<Like>()
          .HasKey(k => new { k.LikerId, k.LikeeId });

      builder.Entity<Like>()
          .HasOne(u => u.Likee)
          .WithMany(u => u.Likers)
          .HasForeignKey(u => u.LikeeId)
          .OnDelete(DeleteBehavior.Restrict);

      builder.Entity<Like>()
          .HasOne(u => u.Liker)
          .WithMany(u => u.Likees)
          .HasForeignKey(u => u.LikerId)
          .OnDelete(DeleteBehavior.Restrict);

      builder.Entity<MessageModel>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

      builder.Entity<MessageModel>()
          .HasOne(u => u.Recipient)
          .WithMany(m => m.MessagesReceived)
          .OnDelete(DeleteBehavior.Restrict);
    }
  }
}