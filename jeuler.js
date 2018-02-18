
    function* nums() {
        for (var n = 0;;n++) {
            yield(n);
        }
    }

    function* take(iterable, n) {
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

    function* product(a, b) {
        let i = a.next();
        let j = b.next();
        let m = [];
        let n = [];
        while(!i.done || !j.done) {
            if (!i.done) {
                mm = i.value;
                for(let nn of n) {
                    yield [mm, nn];
                }
                m.push(mm);
                i = a.next();
            }
            if (!j.done) {
                nn = j.value;
                for(let mm of m) {
                    yield [mm, nn];
                }
                n.push(nn);
                j = b.next();
            }
        }
    }

    function toDigits(n) {
        let d=[];
        for(;n>0;) {
            let m = n%10;
            d.unshift(m);
            n=(n-m)/10;
        }
        return d;
    }

    function fromDigits(digits) {
        let n=0;
        for(let d of digits) {
            n = n*10 + d;
        }
        return n;
    }

    
    function max(iterable) {
        return reduce(iterable, Number.MIN_VALUE, Math.max);
    }

    function isPalindrome(arr) {
        for(let i=0, j=arr.length-1; j>i; i++,j--) {
            if (arr[i] != arr[j])
                return false;
        }
        return true;
    }

    function dump(i) {
        for(let j = i.next(); !j.done;) {
            v = j.value;
            j = i.next();
            process.stdout.write(`${v}${j.done ? '\n' : ', '}`);
        }
    }

    function euler001() {
        t = take(nums(), 1000);
        f = filter(t,i=>(i%3==0)||(i%5==0));
        r = reduce(f,0,(a,b)=>a+b);
        console.log(r);
    }

    function euler002() {
        n = fibonacci();
        t = takeWhile(n,i=>i<4000000);
        f = filter(t,i=>i%2==0);
        r = reduce(f,0,(a,b)=>a+b);
        console.log(r);
    }

    function euler003() {
        r = primeFactors(600851475143);
        console.log(r);
    }

    function euler004() {
        a = take(nums(), 1000);
        b = take(nums(), 1000);
        p = product(a,b);
        m = map(p, i=>i[0]*i[1]);
        n = map(m, toDigits);
        f = filter(n, isPalindrome);
        g = map(f, fromDigits);
        h = max(g);
        console.log(h);
    }
    
euler004();
