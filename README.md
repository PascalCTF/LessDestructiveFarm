# Less Destructive Farm

Look at the examples in `game-archive`, you should put your node module that export a submitter with the game configuration in the `game` folder.

The package.json and the other module files should be directly inside the game folder:
- game/package.json
- game/index.js
- game/...

After that just use `docker-compose up -d` and you are ready to go.

## Client

https://github.com/DestructiveVoice/DestructiveFarm/blob/master/docs/en/farm_client.md

## Basic Authentication

To enable Basic Authentication for the web interface and API, you can provide the `BASIC_AUTH` environment variable to your container. The format should be `username:password`.

For example, in your `docker-compose.yml`:
```yaml
    environment:
      - BASIC_AUTH=admin:secret
```
This will automatically secure the Next.js client and the internal GraphQL endpoints.