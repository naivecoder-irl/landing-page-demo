# Grist Local Deployment Doc

Under directory `/landing-page-demo/landing-page-grist`

```shell
docker pull gristlabs/grist

docker run -d --name=grist -p 8484:8484 -v $PWD/persist:/persist -it gristlabs/grist
```



### Reference

https://github.com/gristlabs/grist-core

