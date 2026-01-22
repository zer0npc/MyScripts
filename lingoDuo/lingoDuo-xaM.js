try {
    console.log('duolingo log0 ----', $response.body)
    let obj = JSON.parse($response.body);
    console.log('duolingo log1 start')
    console.log(obj.responses.length)
    console.log('duolingo log1 end')
    if (!obj.responses || (obj.responses[0].headers && 'etag' in obj.responses[0].headers)); // skip
    else {
        const now = Math.floor(Date.now() / 1000);
        const userdata = JSON.parse(obj.responses[0].body);
        if (!userdata.shopItems) userdata.shopItems = [];
        userdata.shopItems.push({
            id: 'gold_subscription',
            purchaseDate: now - 172800,
            purchasePrice: 0,
            subscriptionInfo: {
                expectedExpiration: now + 31536000,
                productId: "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.24Q2Max.168",
                renewer: 'APPLE',
                renewing: true,
                tier: 'twelve_month',
                type: 'gold'
            }
        });
        userdata.subscriberLevel = 'GOLD';
        if (!userdata.trackingProperties) userdata.trackingProperties = {};
        userdata.trackingProperties.has_item_immersive_subscription = true;
        userdata.trackingProperties.has_item_premium_subscription = true;
        userdata.trackingProperties.has_item_live_subscription = true;
        userdata.trackingProperties.has_item_gold_subscription = true;
        userdata.trackingProperties.has_item_max_subscription = true;
        obj.responses[0].body = JSON.stringify(userdata);
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    console.log('duolingo log err', e)
    $done({});
}
