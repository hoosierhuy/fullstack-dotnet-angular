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

        }
    }
}
