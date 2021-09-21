# replica set resilience on election time after primary is down

## Steps to reproduce
- docker-compose pull
- docker-compose up
- stop mongo1 as it should be the PRIMARY
- Wait for new PRIMARY election
- start mongo1 and wait for it to become PRIMARY again

Somewhere in the last steps the insert fails with a network error.
If it doesn't fails you can modify the value of `const intervalTime = 500` and try again.
