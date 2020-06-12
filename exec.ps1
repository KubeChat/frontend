docker build --rm -t kubechat .
docker run -p 3000:3000 --pid=host kubechat