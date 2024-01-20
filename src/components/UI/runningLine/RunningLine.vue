<template>
    <header class="header ticker-wrapper">
        <div class="ticker-wrapper__first-half">
            <p>USE COUPON &ldquo;MONICA50&rdquo; TO GET 50% OFF</p>
            <p>USE COUPON &ldquo;MONICA50&rdquo; TO GET 50% OFF</p>
            <p>USE COUPON &ldquo;MONICA50&rdquo; TO GET 50% OFF</p>
        </div>
        <div class="ticker-wrapper__second-half">
            <p>USE COUPON &ldquo;MONICA50&rdquo; TO GET 50% OFF</p>
            <p>USE COUPON &ldquo;MONICA50&rdquo; TO GET 50% OFF</p>
            <p>USE COUPON &ldquo;MONICA50&rdquo; TO GET 50% OFF</p>
        </div>
    </header>
</template>

<style scoped lang="css">
.header {
    background: #000000;
    overflow: hidden;
    height: 65px;
    position: relative;
}

.ticker-wrapper__first-half,
.ticker-wrapper__second-half {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    animation: ticker 30s infinite linear forwards;
}

.ticker-wrapper__second-half {
    animation: 30s ticker 30s/2 infinite linear forwards;
}

div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 65px;
    transform: translate(100%, 0);
}

p {
    font-family: 'Quicksand', sans-serif;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
}

img {
    height: 60px;
}

@keyframes ticker {
    0% {
        transform: translate(100%, 0);
    }

    50% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-100%, 0);
    }
}
</style>
