let body = $response.body;
if (body) {
    try {
        let obj = JSON.parse(body);
        // 校验数据结构是否存在
        if (obj.responses && obj.responses.length > 0) {
            let userdata = JSON.parse(obj.responses[0].body);
            const timestamp = Math.floor(Date.now() / 1000);

            // 1. 注入订阅信息
            if (!userdata.shopItems) userdata.shopItems = [];
            userdata.shopItems.push({
                "id": "gold_subscription",
                "purchaseDate": timestamp - 172800,
                "purchasePrice": 0,
                "subscriptionInfo": {
                    "expectedExpiration": timestamp + 31536000,
                    "productId": "com.duolingo.DuolingoMobile.subscription.Gold.TwelveMonth.24Q2Max.168",
                    "renewer": "APPLE",
                    "renewing": true,
                    "tier": "twelve_month",
                    "type": "gold"
                }
            });

            // 2. 修改会员等级
            userdata.subscriberLevel = "GOLD";

            // 3. 修改追踪属性 (解锁各种权限标签)
            if (!userdata.trackingProperties) userdata.trackingProperties = {};
            const props = [
                "has_item_immersive_subscription",
                "has_item_premium_subscription",
                "has_item_live_subscription",
                "has_item_gold_subscription",
                "has_item_max_subscription"
            ];
            props.forEach(p => userdata.trackingProperties[p] = true);

            // 4. 写回数据
            obj.responses[0].body = JSON.stringify(userdata);
            $done({ body: JSON.stringify(obj) });
        } else {
            $done({}); // 结构不符，原样返回
        }
    } catch (e) {
        console.log("Duolingo Script Error: " + e);
        $done({}); // 发生错误，原样返回
    }
} else {
    $done({});
}
