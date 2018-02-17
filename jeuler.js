
    function* nums() {
        for (var n = 0;;n++) {
            yield(n);
        }
    }

    function* take(n, iterable) {
        for (let x of iterable) {
            if (n-- <= 0) return;
            yield x;
        }
    }

    function* takeWhile(iterable, whileFunc) {
        for (let i of iterable) {
            if(!whileFunc(i)) return i;
            yield i;
        }
    }

    function* map(iterable, mapFunc) {
        for (let x of iterable) {
            yield mapFunc(x);
        }
    }

    function* filter(iterable, filterFunc) {
        for (let x of iterable) {
            if (filterFunc(x)) {
                yield x;
            }
        }
    }

    function reduce(iterable, initial, reduceFunc) {
        let i = initial;
        for (let x of iterable) {
            i = reduceFunc(i,x);
        }
        return i;
    }

    function* fibonacci() {
        for (let a = 1, b = 2;; [a, b] = [b, a + b])
            yield a;
    }

    function* primes() {
        let list = [2,3,5,7,11,13,17,19];

        yield* list;

        for(let next = list[list.length-1]+2,factorIndex = 0;;) {
            if (next%list[factorIndex] == 0) {
                factorIndex = 0;
                next += 2;
            } else if (list[factorIndex]**2 >= next) {
                yield next;
                list.push(next);
                next += 2;
                factorIndex = 0;
            } else {
                factorIndex++;
            }
        }
    }

    function* primeFactors(n) {
        yield* filter(takeWhile(primes(),p=>p*p<n),p=>n%p==0);
    }

    function toDigits(n) {
        let d=[];
        for(;n>0;) {
            let m = n%10;
            d.push(m);
            n=(n-m)/10;
        }
        return d;
    }

    function isPalindrome(arr) {
        for(let i=0, j=arr.length-1; j>i; i++,j--) {
            if (arr[i] != arr[j])
                return false;
        }
        return true;
    }

    function euler001() {
        t = take(1000, nums());
        f = filter(t,i=>(i%3==0)||(i%5==0));
        r = reduce(f,0,(a,b)=>a+b);
        return r;
    }

    function euler002() {
        n = fibonacci();
        t = takeWhile(n,i=>i<4000000);
        f = filter(t,i=>i%2==0);
        r = reduce(f,0,(a,b)=>a+b);
        return r;
    }

    function euler003() {
        return primeFactors(600851475143);
    }
    
    function dump(i) {
        for(let j = i.next(); !j.done;) {
            v = j.value;
            j = i.next();
            process.stdout.write(`${v}${j.done ? '\n' : ', '}`);
        }
    }

dump(takeWhile(primes(),i=>i<100));
