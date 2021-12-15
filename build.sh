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
echo "Docker image built."

# Tag it
if [ $snapshot = false ]; then
  echo "Adding release version tag."
  docker tag $repository/$image:latest $repository/$image:"$version"
fi

# Push docker image to our container registry

echo "Pushing latest tag..."
docker push $repository/$image:latest

echo "Pushed latest tag."

if [ $snapshot = false ]; then
    echo "Pushing release version tag..."
    docker push $repository/$image:latest
    echo "Pushed release version tag."
fi

echo "Successfully built and deployed~!"
