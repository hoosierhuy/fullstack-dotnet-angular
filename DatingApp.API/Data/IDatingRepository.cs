﻿using DatingApp.API.Helpers;
using DatingApp.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingApp.API.Data
{
  public interface IDatingRepository
  {
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
    Task<bool> SaveAll();
    Task<PageList<UserModel>> GetUsers(UserParams userParams);
    Task<UserModel> GetUser(int id);
    Task<PhotoModel> GetPhoto(int id);
    Task<PhotoModel> GetMainPhotoForUser(int id);
    Task<Like> GetLike(int userId, int recipientId);
    Task<MessageModel> GetMessage(int id);
    Task<PageList<MessageModel>> GetMessagesForUser(MessageParams messageParams);
    Task<IEnumerable<MessageModel>> GetMessageThread(int userId, int recipientId);
  }
}
