
# Página Web Mande

Página para ofertar diferentes labores que personas de diferentes partes pueden ver y contratar.


## Deployment

To deploy this project run the following command inside the directory to run the api

```bash
  docker build -t mande_api .
```
To create the data base run the following command:
```bash
  docker run --name mande_db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=letmeinnow -e POSTGRES_DB=mande_db -p 5432:5432 -d postgres
```
Now copi the data base information inside the container:
```bash
  docker cp data_base.sql mande_db:/data_base.sql
```

Execute the container:
```bash
  docker exec -it mande_db /bin/bash
```
And use the data base information:
```bash
  psql -U postgres mande_db < data_base.sql
```
## Tech Stack

**Client:** View, Css, Bootstrap, Html

**Server:** Node, Express

