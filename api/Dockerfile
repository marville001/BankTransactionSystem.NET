FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore

RUN dotnet dev-certs https --clean
RUN dotnet dev-certs https -trust
RUN dotnet dev-certs https -check

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App
COPY --from=build-env /App/out .

EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_URLS="https://+:80;"

ENTRYPOINT ["dotnet", "api.dll"]