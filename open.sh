pushd rest && code . && popd
pushd webapp && code . && popd
docker run -p 127.0.0.1:27017:27017 -v /Users/jkent/mongo-data:/data/db mongo
