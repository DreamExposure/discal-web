echo "Preparing to build and deploy..."

# Define some things
repository="rg.nl-ams.scw.cloud/dreamexposure"
image="discal-web2"

version=$(cat VERSION)
snapshot=false # Set default

# Determine if this is a snapshot build

case "$version" in
*SNAPSHOT*)
  snapshot=true
  ;;
esac

# Build docker image
echo "Building docker image..."
docker build -t $repository/$image:latest .

# Tag it
if [ $snapshot = false ]; then
  echo "Adding release version tag."
  docker tag $repository/$image:latest $repository/$image:"$version"
fi

# Login to container registry
echo "Logging in to container registry..."
docker login rg.nl-ams.scaleway.com/dreamexposure -u "$SCW_USER" -p "$SCW_SECRET"

# Push docker image to our container registry

echo "Pushing latest tag..."
docker push $repository/$image:latest

if [ $snapshot = false ]; then
    echo "Pushing release version tag..."
    docker push $repository/$image:latest
fi

echo "Done~!"
