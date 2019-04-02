# Full Stack .Net Core, WebApi, C#, SQLite Relational DB, and Angular 6 App, on a Mac :-)

I created this branch to use MySql as database.

Full stack dating app (insert your own joke here).  This type of project will require some level of familiarity with how modern .Net Core apps works.

I've removed my own personal credentials for the Cloudinary cloud-based photo repository, if want to use this free service, you will have to sign up for your own account and enter the creds in ./appsettings.json file, in the "CloudinarySettings" object.

To run the app:

    - Install .net core, SqlLite, and get a free Cloudinary accout for cloud photo repo and enter your creds in the DatingApp.API -> appsettings.json file.
    - Clone this repo.
    - Go to DatingApp-Spa directory and run `npm install`, might have to resolve node-sass issue if you're on bsd based OS.
    - Go to the DatingApp.API directory, open the Startup.cs file and uncomment the `seedData.SeedUsers();` line.  Open a terminal at the root of this project and run `dotnet ef database update` command. If there are no errors, issue `dotnet run` command.
    - In the root of the DatingApp-Spa directory, issue the `npm start` command.

This is what the app looks like as of 2/2019:
![ss1](/DatingApp-SPA/src/assets/ReadMeImages/dating_app.gif)
