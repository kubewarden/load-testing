Vanilla policy server, 10k rolebindings

```console

╰─ k6 run main.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: main.js
     output: -

  scenarios: (100.00%) 1 scenario, 20 max VUs, 1m35s max duration (incl. graceful stop):
           * policy_server: Up to 20 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     █ get-all

       ✓ response code was 200
       ✓ response uid matches request
       ✓ admission request accepted

     checks.........................: 100.00% ✓ 4716     ✗ 0
     data_received..................: 445 kB  6.8 kB/s
     data_sent......................: 3.5 MB  54 kB/s
     group_duration.................: avg=736.61ms min=123.59ms med=800.15ms max=1.04s    p(90)=931.32ms p(95)=963.64ms
     http_req_blocked...............: avg=7.69µs   min=1.35µs   med=3.8µs    max=1.77ms   p(90)=5.12µs   p(95)=6.11µs
     http_req_connecting............: avg=3.04µs   min=0s       med=0s       max=1.73ms   p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=736.02ms min=123.34ms med=799.43ms max=1.04s    p(90)=930.73ms p(95)=963.07ms
       { expected_response:true }...: avg=736.02ms min=123.34ms med=799.43ms max=1.04s    p(90)=930.73ms p(95)=963.07ms
   ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 1572
     http_req_receiving.............: avg=68.76µs  min=22.59µs  med=64.2µs   max=985.39µs p(90)=84.42µs  p(95)=97.09µs
     http_req_sending...............: avg=32.02µs  min=9.37µs   med=22.27µs  max=10.78ms  p(90)=29.53µs  p(95)=35µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=735.92ms min=123.29ms med=799.35ms max=1.04s    p(90)=930.63ms p(95)=962.98ms
     http_reqs......................: 1572    24.14629/s
     iteration_duration.............: avg=736.65ms min=123.61ms med=800.32ms max=1.04s    p(90)=931.35ms p(95)=963.67ms
     iterations.....................: 1572    24.14629/s
     vus............................: 1       min=1      max=20
     vus_max........................: 20      min=20     max=20


running (1m05.1s), 00/20 VUs, 1572 complete and 0 interrupted iterations
policy_server ✓ [======================================] 00/20 VUs  1m5s
ERRO[0066] thresholds on metrics 'http_req_duration' have been crossed
```

# sqlite policy server, 10k rolebindings

```console


╰─ k6 run main.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: main.js
     output: -

  scenarios: (100.00%) 1 scenario, 20 max VUs, 1m35s max duration (incl. graceful stop):
           * policy_server: Up to 20 looping VUs for 1m5s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     █ get-all

       ✓ response code was 200
       ✓ response uid matches request
       ✗ admission request accepted
        ↳  99% — ✓ 574 / ✗ 5

     checks.........................: 99.71% ✓ 1732     ✗ 5
     data_received..................: 165 kB 2.5 kB/s
     data_sent......................: 1.3 MB 20 kB/s
     group_duration.................: avg=2.01s   min=170.07ms med=2.23s   max=2.77s    p(90)=2.48s   p(95)=2.57s
     http_req_blocked...............: avg=8.94µs  min=1.5µs    med=3.26µs  max=198.49µs p(90)=4.72µs  p(95)=6.04µs
     http_req_connecting............: avg=4.05µs  min=0s       med=0s      max=149.37µs p(90)=0s      p(95)=0s
   ✗ http_req_duration..............: avg=2.01s   min=169.72ms med=2.23s   max=2.77s    p(90)=2.48s   p(95)=2.57s
       { expected_response:true }...: avg=2.01s   min=169.72ms med=2.23s   max=2.77s    p(90)=2.48s   p(95)=2.57s
   ✓ http_req_failed................: 0.00%  ✓ 0        ✗ 579
     http_req_receiving.............: avg=66.99µs min=27.33µs  med=64.63µs max=155.54µs p(90)=84.5µs  p(95)=90.06µs
     http_req_sending...............: avg=22.39µs min=13.28µs  med=20.82µs max=217.32µs p(90)=28.84µs p(95)=33.88µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=2.01s   min=169.64ms med=2.23s   max=2.77s    p(90)=2.48s   p(95)=2.57s
     http_reqs......................: 579    8.888513/s
     iteration_duration.............: avg=2.01s   min=170.08ms med=2.23s   max=2.77s    p(90)=2.48s   p(95)=2.57s
     iterations.....................: 579    8.888513/s
     vus............................: 1      min=1      max=20
     vus_max........................: 20     min=20     max=20
```
