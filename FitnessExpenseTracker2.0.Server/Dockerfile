#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM node:16-alpine AS react-build 
#WORKDIR /app 
#COPY fitnessexpensetracker2.0.client/package.json fitnessexpensetracker2.0.client/package-lock.json ./ 
#RUN npm install 
#COPY fitnessexpensetracker2.0.client/ ./ 
#EXPOSE 5173
#CMD ["npm", "run", "dev"]
#RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
EXPOSE 5173
EXPOSE 7241

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["fitnessexpensetracker2.0.client/nuget.config", "fitnessexpensetracker2.0.client/"]
COPY ["FitnessExpenseTracker2.0.Server/FitnessExpenseTracker2.0.Server.csproj", "FitnessExpenseTracker2.0.Server/"]
COPY ["fitnessexpensetracker2.0.client/fitnessexpensetracker2.0.client.esproj", "fitnessexpensetracker2.0.client/"]
RUN dotnet restore "./FitnessExpenseTracker2.0.Server/FitnessExpenseTracker2.0.Server.csproj"
COPY . .
WORKDIR "/src/FitnessExpenseTracker2.0.Server"
RUN dotnet build "./FitnessExpenseTracker2.0.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./FitnessExpenseTracker2.0.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FitnessExpenseTracker2.0.Server.dll"]