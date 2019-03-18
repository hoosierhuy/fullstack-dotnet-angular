using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<UserModel, UserForListDto>()
          .ForMember(dest => dest.PhotoUrl, opt =>
          {
            opt.MapFrom(src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url);
          })
          .ForMember(dest => dest.Age, opt =>
          {
            opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
          });

      CreateMap<UserModel, UserForDetailedDto>()
          .ForMember(dest => dest.PhotoUrl, opt =>
          {
            opt.MapFrom(src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url);
          })
          .ForMember(dest => dest.Age, opt =>
          {
            opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
          });

      CreateMap<PhotoModel, PhotosForDetailedDto>();
      CreateMap<UserForUpdateDto, UserModel>();
      CreateMap<PhotoModel, PhotoForReturnDto>();
      CreateMap<PhotoForCreationDto, PhotoModel>();
      CreateMap<MessageForCreationDto, MessageModel>().ReverseMap();
      CreateMap<MessageModel, MessageToReturnDto>()
          .ForMember(m => m.SenderPhotoUrl, opt => opt
              .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
          .ForMember(m => m.RecipientPhotoUrl, opt => opt
              .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
    }
  }
}
