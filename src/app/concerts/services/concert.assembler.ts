static toEntityFromResource(resource: ConcertResource): Concert {
  return {
    id: Number(resource.id),
    artistName: [resource.artist?.name || ''],
    genre: [resource.artist?.genre || ''],
    description: resource.description,
    image: resource.image,
    date: resource.date,
    venueName: resource.venue?.name,
    venueAddress: resource.venue?.address,
    venueLocation: resource.venue?.location
  };
}
